import {Request, Response} from "express";
import {
  RegisterSupplierErrors,
  SupplierRegistrationData,
  SupplierService
} from "../../../../domain/supplier/SupplierService.ts";
import {Supplier} from "../../../../domain/supplier/Supplier.ts";
import {isSuccess, Result} from "../../../../mf-ts/core/resultPipe.ts";
import {pipe} from "../../../../mf-ts/iterators/pipe.ts";

const errorCodes: Record<RegisterSupplierErrors["error"], number> = {
  CouldNotSaveSupplierError: 500,
  UsernameIsNotUnique: 422
}



export const registerSupplierController = (supplierService: SupplierService) =>
  async (request: Request<{}, {}, SupplierRegistrationData>, response: Response<Result<Supplier, RegisterSupplierErrors>>) => {
    const registrationData = request.body;
    supplierService.registerSupplier(registrationData).then(
      pipe(setResponseCode(getResponseCode)(response), response.send))
  }