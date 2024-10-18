import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class SupplierEntity {
  @PrimaryColumn()
  username: string

  @Column({length: 65})
  walletAddress: string

  @Column()
  apiKey: string

  @Column()
  credits: number // TODO
}