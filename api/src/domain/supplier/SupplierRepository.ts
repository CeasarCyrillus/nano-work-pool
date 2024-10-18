import {Supplier} from "./Supplier.ts";

export type SupplierRepository = {
  save: (supplierData: Supplier) => Promise<Supplier>
  findByUsername: (username: String) => Promise<Supplier | null>
}