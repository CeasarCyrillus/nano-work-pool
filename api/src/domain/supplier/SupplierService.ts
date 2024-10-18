import {failure, pipeAsyncResult, Result, success} from "../../mf-ts/core/resultPipe.ts";
import { SupplierRepository} from "./SupplierRepository.ts";
import {RandomService} from "../services/randomService.ts";
import {Supplier} from "./Supplier.ts";

export type SupplierRegistrationData = {
  walletAddress: string,
  username: string
}

type UsernameIsNotUniqueError = {
  error: "UsernameIsNotUnique",
  printableMessage: "Username is already taken!"
}

export type CouldNotSaveSupplierError = {
  error: "CouldNotSaveSupplierError",
  printableMessage: "Supplier could not be saved!"
}

export type RegisterSupplierErrors = UsernameIsNotUniqueError | CouldNotSaveSupplierError
export type SupplierService = {
  registerSupplier: (registrationData: SupplierRegistrationData) =>
    Promise<Result<Supplier, RegisterSupplierErrors>>
}

type SupplierServiceDeps = {
  randomService: RandomService,
  supplierRepository: SupplierRepository
}

const checkUsernameIsUnique = (getSupplier: (username: string) => Promise<Supplier | null>) =>
  async (registrationData: SupplierRegistrationData): Promise<Result<SupplierRegistrationData, UsernameIsNotUniqueError>> => {
    const user = await getSupplier(registrationData.username);
    if (user === null) {
      return success(registrationData)
    }

    return failure<UsernameIsNotUniqueError>({error: "UsernameIsNotUnique", printableMessage: "Username is already taken!"})
  }

const generateApiKey = (generateId: () => string) => () => `SUPPLIER_${generateId()}`

const mapSupplierData = (apiKey: () => string) => (data: SupplierRegistrationData): Result<Supplier, never> => success({
  apiKey: apiKey(),
  credits: 0,
  username: data.username,
  walletAddress: data.walletAddress
})

const saveSupplier = (save: (supplier: Supplier) => Promise<Supplier>) => (supplier: Supplier): Promise<Result<Supplier, CouldNotSaveSupplierError>> => save(supplier)
  .then((result) => success(result))
  .catch(() => failure<CouldNotSaveSupplierError>({error: "CouldNotSaveSupplierError", printableMessage: "Supplier could not be saved!"}))

export const registerSupplier = (
  generateId: () => string,
  getUser: (username: string) => Promise<Supplier | null>,
  save: (supplier: Supplier) => Promise<Supplier>) => {
    const getApiKey = generateApiKey(generateId)
    return pipeAsyncResult(
      checkUsernameIsUnique(getUser),
      mapSupplierData(getApiKey),
      saveSupplier(save),
    )
};

export const createSupplierService = (deps: SupplierServiceDeps): SupplierService =>
  ({
    registerSupplier: registerSupplier(
      deps.randomService.randomId,
      deps.supplierRepository.findByUsername,
      deps.supplierRepository.save)
  })
