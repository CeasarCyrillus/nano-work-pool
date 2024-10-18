import {SupplierEntity} from "./entity/SupplierEntity.ts";
import {DataSource} from "typeorm";
import {SupplierRepository} from "../../domain/supplier/SupplierRepository.ts";
import {Supplier} from "../../domain/supplier/Supplier.ts";

export const initializeSupplierRepository = (dataSource: DataSource): SupplierRepository => {
  const repository = dataSource.getRepository(SupplierEntity);
  return {
    findByUsername: (username: string) => repository.findOneBy({username}),
    save: (supplier: Supplier) => repository.save(supplier)
  }
}