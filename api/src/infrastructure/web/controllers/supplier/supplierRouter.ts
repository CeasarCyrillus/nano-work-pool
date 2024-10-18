import express from "express";
import {registerSupplierController} from "./supplierController.ts";
import {RegisterSupplierErrors, SupplierService} from "../../../../domain/supplier/SupplierService.ts";

export const initializeSupplierRouter = (supplierService: SupplierService) => {
  const supplierRouter = express.Router()
  supplierRouter.post("/register", registerSupplierController(supplierService))
  return supplierRouter.stat
}