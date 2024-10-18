import express from "express";
import {createOfferController} from "./offerController.ts";

const offerRouter = express.Router()
offerRouter.post("/", createOfferController)

export default offerRouter;