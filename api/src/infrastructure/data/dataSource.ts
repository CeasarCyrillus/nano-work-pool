import {DataSource} from "typeorm";
import {SupplierEntity} from "./entity/SupplierEntity.ts";
import "reflect-metadata"

export const dataSource = new DataSource({
                                       type: "postgres",
                                       host: "localhost",
                                       port: 5432,
                                       username: "root",
                                       password: "admin",
                                       database: "nano-work-pool",
                                       entities: [SupplierEntity],
                                       synchronize: true,
                                       logging: false,
                                     })