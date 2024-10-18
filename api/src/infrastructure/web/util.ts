import {isSuccess, Result} from "../../mf-ts/core/resultPipe.ts";
import {Response} from "express";
import {pipe} from "../../mf-ts/iterators/pipe.ts";

const getResponseCode = <TValue, TError extends {error: string}>(successCode: number, errorCodes: Record<TError["error"], number>) =>
  (result: Result<TValue, TError>): number => {
    if(isSuccess(result)) {
      return successCode
    }

    return errorCodes[result.error]
  }

const setResponseCode = <TValue, TError extends {error: string}>(getResponseCode: (result: Result<TValue, TError>) => number) =>
  (response: Response<Result<TValue, TError>>) =>
    (result: Result<TValue, TError>) => {
      response.status(getResponseCode(result))
      return result
    }

const makeResponse = <TValue, TError extends {error: string}>(successCode: number, errorCodes: Record<TError["error"], number>) =>
  (response: Response<Result<TValue, TError>>) => {
  const getResponse2 = getResponseCode(successCode, errorCodes)
    return (result: Promise<Result<TValue, TError>>) => result.then(y => pipe(setResponseCode(getResponse2)(response)));
  }