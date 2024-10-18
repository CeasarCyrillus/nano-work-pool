import express from "express";
import {registerConsumerController} from "./consumerController.ts";

const consumerRouter = express.Router()
consumerRouter.post("/register", registerConsumerController)

export default consumerRouter;