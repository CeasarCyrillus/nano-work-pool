import {Request, Response} from "express";
import {createOffer, CreateOfferData, Offer} from "../../../../domain/repositories/offerRepository.ts";
import {FullFillOfferData} from "../../../../domain/services/OfferService.ts";

export const createOfferController = (request: Request<{}, {}, CreateOfferData>, response: Response<Offer>) => {
  const createOfferData = request.body
  const offer = createOffer(createOfferData)
  response
    .status(201)
    .send(offer)
}

export const fullFillOfferController = (request: Request<{}, {}, FullFillOfferData>, response: Response<Offer>) => {
  const createOfferData = request.body
  const offer = createOffer(createOfferData)
  response
    .status(201)
    .send(offer)
}
