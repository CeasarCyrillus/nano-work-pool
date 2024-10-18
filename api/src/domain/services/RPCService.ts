import {pipe} from "../../mf-ts/iterators/pipe.ts";
import {failure, pipeAsyncResult, Result, ResultFunc, success} from "../../mf-ts/core/resultPipe.ts";
import {Func} from "../../mf-ts/core/Func.ts";
import {validate} from "../../mf-ts/core/validate.ts";

export enum WorkDifficultyType {
  ALL = "ffffffc000000000",
  SEND = "fffffff800000000",
  RECEIVE = "fffffe0000000000",
}

type WorkGenerateCommand = {
  action: "work_generate",
  hash: string,
  difficulty: string
} & Record<string, any>

type WorkGenerateResponse = {
  work: string,
  difficulty: string
}

const toWorkGenerateCommand = (difficulty: WorkDifficultyType) =>
  (hash: string): WorkGenerateCommand => ({
    difficulty,
    hash,
    action: "work_generate"
})


type RequestFailedError = {
  error: "RequestFailed", message: any
}
export const rpcPostRequest = (url: string) =>
  async (body: string): Promise<Result<Response, RequestFailedError>> => {
    try {
      const result = await fetch(url, {method: "POST", body, headers: {"Content-Type": "application/json"}});
      if (result.ok) {
        return success(result)
      } else {
        throw result.statusText
      }
    } catch (e) {
      const error: RequestFailedError = {error: "RequestFailed", message: e}
      return failure(error)
    }
  };

type InvalidResponseError = {
  error: "InvalidResponseError",
  message: any
}

const parseResponse = async (response: Response) => {
  try {
    const body = await response.json()
    return success(body)
  } catch (e) {
    const error: InvalidResponseError = {
      error: "InvalidResponseError",
      message: e
    }
    return failure(error)
  }
}


const validateResponseShape = (workData: any)  => {
  if(workData && "work" in workData && "difficulty" in workData) {
    return success(workData as WorkGenerateResponse)
  }

  const error: InvalidResponseError = {
    error: "InvalidResponseError",
    message: `invalid response: ${JSON.stringify(workData)}`
  };
  return failure(error)
}

type InvalidWorkError = {
  error: "InvalidWorkError"
}

const workIsValid = (requiredDifficulty: WorkDifficultyType) =>
  (actualDifficulty: string) => {
    const requiredWork = parseInt(requiredDifficulty, 16)
    const actualWork = parseInt(actualDifficulty, 16)
    return actualWork >= requiredWork
}

type ValidateWorkFunc = Func<WorkGenerateResponse, Result<WorkGenerateResponse, InvalidWorkError>>;
type GetGenerateWorkCommand = (hash: string) => WorkGenerateCommand
type MakeRPCRequest = (body: string) => Promise<Result<Response, RequestFailedError>>

const generateWork = (
  validateWork: ValidateWorkFunc,
  getWorkCommand: GetGenerateWorkCommand,
) =>
  (makeRequest: MakeRPCRequest) =>
    pipeAsyncResult(
      pipe(getWorkCommand, JSON.stringify, success),
      makeRequest,
      parseResponse,
      validateResponseShape,
      validateWork
    )

const getDifficulty = (response: WorkGenerateResponse) => response.difficulty
const validateWork = (isValid: (work: string) => boolean) => validate<WorkGenerateResponse, InvalidWorkError>(
  {error: "InvalidWorkError"},
  pipe(
    getDifficulty,
    isValid
  )
)

const sendWorkIsValid = workIsValid(WorkDifficultyType.SEND)
const validateSendWork = validateWork(sendWorkIsValid)
const getSendWorkCommand = toWorkGenerateCommand(WorkDifficultyType.SEND)

export const generateSendWork = generateWork(validateSendWork, getSendWorkCommand)