import {Request, Response} from "express";
import {createOffer, CreateOfferData, Offer} from "../../../../domain/repositories/offerRepository.ts";
import {Consumer, registerConsumer, RegistrationData} from "../../../../domain/repositories/consumerRepository.ts";

export const registerConsumerController = (request: Request<{}, {}, RegistrationData>, response: Response<Consumer>) => {
  const registrationData = request.body
  const consumer = registerConsumer(registrationData)
  response
    .status(201)
    .send(consumer)
}