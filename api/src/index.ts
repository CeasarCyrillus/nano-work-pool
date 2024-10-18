import express from 'express';
import bodyParser from "body-parser";
import offerRouter from "./infrastructure/web/controllers/offer/offerRouter.ts";
import consumerRouter from "./infrastructure/web/controllers/consumer/consumerRouter.ts";
import {logger} from "./domain/services/Logger.ts";
import "reflect-metadata"
import {dataSource} from "./infrastructure/data/dataSource.ts";
import {createSupplierService} from "./domain/supplier/SupplierService.ts";
import {randomService} from "./domain/services/randomService.ts";
import {initializeSupplierRepository} from "./infrastructure/data/supplierRepository.ts";
import {registerSupplierController} from "./infrastructure/web/controllers/supplier/supplierController.ts";

const app = express();
const port = 3000;

//@ts-expect-error
BigInt.prototype.toJSON = function() { return this.toString() }

app.use(bodyParser.json());


const bootStrap = async () => {
  const ds = await dataSource.initialize()
  logger.info("Database initialized")
  await dataSource.synchronize(true)
  logger.info("Database synchronized")

  logger.info("Registering routers")

  const supplierRepository = initializeSupplierRepository(ds)
  const supplierService = createSupplierService({randomService, supplierRepository})
  const supplierRouter = registerSupplierRouter(supplierService)
  app.use("/api/supplier", supplierRouter)
  app.use("/api/offer", offerRouter)
  app.use("/api/consumer", consumerRouter)

  app.listen(port, () => {
    logger.info(`Server is running at http://localhost:${port}`);
  });
}

bootStrap()