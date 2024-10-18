import {UUID, webcrypto} from "node:crypto";

export type RandomService = {
  randomId: () => UUID
}

export const randomService: RandomService = {
  randomId: webcrypto.randomUUID
}
