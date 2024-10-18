import {Func} from "./Func";
import {pipe} from "../iterators/pipe";
import {failure, Result, success} from "./resultPipe.ts";

export const validate = <TValue, TFailure>(error: TFailure, isValid: Func<TValue, boolean>) =>
  (value: TValue): Result<TValue, TFailure> => pipe(
    isValid,
    (isValid) => isValid ?
      success<TValue>(value) :
      failure<TFailure>(error))(value)