import {Func} from "./Func";
import {discriminator} from "./discriminator.ts";
export type Success<T> = {kind: "Success", value: T}
export type Failure<T> = {kind: "Failure", error: T}

export type Result<TSuccess, TFailure>  = Success<TSuccess> | Failure<TFailure>

export const isSuccess = discriminator<Success<unknown>>("Success")
export const isFailure = discriminator<Failure<unknown>>("Failure")

export const failure = <T>(failureValue: T): Result<never, T> => ({
  kind: "Failure",
  error: failureValue
})

export const success = <T>(value: T): Success<T> => ({
  kind: "Success",
  value
})

type AsyncResult<TSuccess, TFailure> = Result<TSuccess, TFailure> | Promise<Result<TSuccess, TFailure>> | Promise<TSuccess> | TSuccess
type AsyncResultFunc<TInput, TSuccess, TFailure> = Func<TInput, AsyncResult<TSuccess, TFailure>>
export type ResultFunc<TInput, TSuccess, TFailure> = Func<TInput, Promise<Result<TSuccess, TFailure>>>

const isPromise = (candidate: AsyncResult<any, any>): candidate is Promise<any> =>
  "then" in candidate && typeof candidate.then === "function"

const isResult = (candidate: any): candidate is Result<unknown, unknown> =>
  "kind" in candidate && (candidate.kind === "Success" || candidate.kind === "Failure")

export function pipeAsyncResult<
  TInput, TSuccess, TFailure
>(
  fn1: AsyncResultFunc<TInput, TSuccess, TFailure>
): ResultFunc<TInput, TSuccess, TFailure>

export function pipeAsyncResult<
  TInput, TSuccess, TFailure,
  TSuccess2, TFailure2
>(
  fn1: AsyncResultFunc<TInput, TSuccess, TFailure>,
  fn2: AsyncResultFunc<TSuccess, TSuccess2, TFailure2>
): ResultFunc<TInput, TSuccess2, TFailure | TFailure2>;

export function pipeAsyncResult<
  TInput, TSuccess, TFailure,
  TSuccess2, TFailure2,
  TSuccess3, TFailure3
>(
  fn1: AsyncResultFunc<TInput, TSuccess, TFailure>,
  fn2: AsyncResultFunc<TSuccess, TSuccess2, TFailure2>,
  fn3: AsyncResultFunc<TSuccess2, TSuccess3, TFailure3>
): ResultFunc<TInput, TSuccess3, TFailure | TFailure2 | TFailure3>;

export function pipeAsyncResult<
  TInput, TSuccess, TFailure,
  TSuccess2, TFailure2,
  TSuccess3, TFailure3,
  TSuccess4, TFailure4
>(
  fn1: AsyncResultFunc<TInput, TSuccess, TFailure>,
  fn2: AsyncResultFunc<TSuccess, TSuccess2, TFailure2>,
  fn3: AsyncResultFunc<TSuccess2, TSuccess3, TFailure3>,
  fn4: AsyncResultFunc<TSuccess3, TSuccess4, TFailure4>
): ResultFunc<TInput, TSuccess4, TFailure | TFailure2 | TFailure3 | TFailure4>;

export function pipeAsyncResult<
  TInput, TSuccess, TFailure,
  TSuccess2, TFailure2,
  TSuccess3, TFailure3,
  TSuccess4, TFailure4,
  TSuccess5, TFailure5
>(
  fn1: AsyncResultFunc<TInput, TSuccess, TFailure>,
  fn2: AsyncResultFunc<TSuccess, TSuccess2, TFailure2>,
  fn3: AsyncResultFunc<TSuccess2, TSuccess3, TFailure3>,
  fn4: AsyncResultFunc<TSuccess3, TSuccess4, TFailure4>,
  fn5: AsyncResultFunc<TSuccess4, TSuccess5, TFailure5>
): ResultFunc<TInput, TSuccess5, TFailure | TFailure2 | TFailure3 | TFailure4 | TFailure5>;

export function pipeAsyncResult<
  TInput, TSuccess, TFailure,
  TSuccess2, TFailure2,
  TSuccess3, TFailure3,
  TSuccess4, TFailure4,
  TSuccess5, TFailure5,
  TSuccess6, TFailure6
>(
  fn1: AsyncResultFunc<TInput, TSuccess, TFailure>,
  fn2: AsyncResultFunc<TSuccess, TSuccess2, TFailure2>,
  fn3: AsyncResultFunc<TSuccess2, TSuccess3, TFailure3>,
  fn4: AsyncResultFunc<TSuccess3, TSuccess4, TFailure4>,
  fn5: AsyncResultFunc<TSuccess4, TSuccess5, TFailure5>,
  fn6: AsyncResultFunc<TSuccess5, TSuccess6, TFailure6>
): ResultFunc<TInput, TSuccess6, TFailure | TFailure2 | TFailure3 | TFailure4 | TFailure5 | TFailure6>;

export function pipeAsyncResult<
  TInput, TSuccess, TFailure,
  TSuccess2, TFailure2,
  TSuccess3, TFailure3,
  TSuccess4, TFailure4,
  TSuccess5, TFailure5,
  TSuccess6, TFailure6,
  TSuccess7, TFailure7
>(
  fn1: AsyncResultFunc<TInput, TSuccess, TFailure>,
  fn2: AsyncResultFunc<TSuccess, TSuccess2, TFailure2>,
  fn3: AsyncResultFunc<TSuccess2, TSuccess3, TFailure3>,
  fn4: AsyncResultFunc<TSuccess3, TSuccess4, TFailure4>,
  fn5: AsyncResultFunc<TSuccess4, TSuccess5, TFailure5>,
  fn6: AsyncResultFunc<TSuccess5, TSuccess6, TFailure6>,
  fn7: AsyncResultFunc<TSuccess6, TSuccess7, TFailure7>
): ResultFunc<TInput, TSuccess7, TFailure | TFailure2 | TFailure3 | TFailure4 | TFailure5 | TFailure6 | TFailure7>;

export function pipeAsyncResult<
  TInput, TSuccess, TFailure,
  TSuccess2, TFailure2,
  TSuccess3, TFailure3,
  TSuccess4, TFailure4,
  TSuccess5, TFailure5,
  TSuccess6, TFailure6,
  TSuccess7, TFailure7,
  TSuccess8, TFailure8
>(
  fn1: AsyncResultFunc<TInput, TSuccess, TFailure>,
  fn2: AsyncResultFunc<TSuccess, TSuccess2, TFailure2>,
  fn3: AsyncResultFunc<TSuccess2, TSuccess3, TFailure3>,
  fn4: AsyncResultFunc<TSuccess3, TSuccess4, TFailure4>,
  fn5: AsyncResultFunc<TSuccess4, TSuccess5, TFailure5>,
  fn6: AsyncResultFunc<TSuccess5, TSuccess6, TFailure6>,
  fn7: AsyncResultFunc<TSuccess6, TSuccess7, TFailure7>,
  fn8: AsyncResultFunc<TSuccess7, TSuccess8, TFailure8>
): ResultFunc<TInput, TSuccess8, TFailure | TFailure2 | TFailure3 | TFailure4 | TFailure5 | TFailure6 | TFailure7 | TFailure8>;

export function pipeAsyncResult<
  TInput, TSuccess, TFailure,
  TSuccess2, TFailure2,
  TSuccess3, TFailure3,
  TSuccess4, TFailure4,
  TSuccess5, TFailure5,
  TSuccess6, TFailure6,
  TSuccess7, TFailure7,
  TSuccess8, TFailure8,
  TSuccess9, TFailure9
>(
  fn1: AsyncResultFunc<TInput, TSuccess, TFailure>,
  fn2: AsyncResultFunc<TSuccess, TSuccess2, TFailure2>,
  fn3: AsyncResultFunc<TSuccess2, TSuccess3, TFailure3>,
  fn4: AsyncResultFunc<TSuccess3, TSuccess4, TFailure4>,
  fn5: AsyncResultFunc<TSuccess4, TSuccess5, TFailure5>,
  fn6: AsyncResultFunc<TSuccess5, TSuccess6, TFailure6>,
  fn7: AsyncResultFunc<TSuccess6, TSuccess7, TFailure7>,
  fn8: AsyncResultFunc<TSuccess7, TSuccess8, TFailure8>,
  fn9: AsyncResultFunc<TSuccess8, TSuccess9, TFailure9>
): ResultFunc<TInput, TSuccess9, TFailure | TFailure2 | TFailure3 | TFailure4 | TFailure5 | TFailure6 | TFailure7 | TFailure8 | TFailure9>;

export function pipeAsyncResult<
  TInput, TSuccess, TFailure,
  TSuccess2, TFailure2,
  TSuccess3, TFailure3,
  TSuccess4, TFailure4,
  TSuccess5, TFailure5,
  TSuccess6, TFailure6,
  TSuccess7, TFailure7,
  TSuccess8, TFailure8,
  TSuccess9, TFailure9,
  TSuccess10, TFailure10
>(
  fn1: AsyncResultFunc<TInput, TSuccess, TFailure>,
  fn2: AsyncResultFunc<TSuccess, TSuccess2, TFailure2>,
  fn3: AsyncResultFunc<TSuccess2, TSuccess3, TFailure3>,
  fn4: AsyncResultFunc<TSuccess3, TSuccess4, TFailure4>,
  fn5: AsyncResultFunc<TSuccess4, TSuccess5, TFailure5>,
  fn6: AsyncResultFunc<TSuccess5, TSuccess6, TFailure6>,
  fn7: AsyncResultFunc<TSuccess6, TSuccess7, TFailure7>,
  fn8: AsyncResultFunc<TSuccess7, TSuccess8, TFailure8>,
  fn9: AsyncResultFunc<TSuccess8, TSuccess9, TFailure9>,
  fn10: AsyncResultFunc<TSuccess9, TSuccess10, TFailure10>
): ResultFunc<TInput, TSuccess10, TFailure | TFailure2 | TFailure3 | TFailure4 | TFailure5 | TFailure6 | TFailure7 | TFailure8 | TFailure9 | TFailure10>;

export function pipeAsyncResult(fn: AsyncResultFunc<unknown, unknown, unknown>, ...fns: AsyncResultFunc<unknown, unknown, unknown>[]) {
  return async (arg: unknown) => {
    try {
      let result = await convertToResult(fn(arg))
      for (const currentFunc of fns) {
          if(isFailure(result)) {
            return result
          }
          result = await convertToResult(currentFunc(result.value))
      }
      return result
    }
    catch (e) {
      return failure(e)
    }
  }
}

const convertToResult = async (result: AsyncResult<unknown, unknown>): Promise<Result<unknown, unknown>> => {
  const resolved = isPromise(result) ? await result : result
  if(isResult(resolved)) {
    return resolved
  }

  return success(resolved) as Result<unknown, unknown>
}