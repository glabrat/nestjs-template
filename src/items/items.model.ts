import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'

import { Order } from 'src/orders/orders.model'

@ObjectType()
@Schema()
export class Item {
  @Field(() => ID)
  id: string

  @Prop()
  title: string

  @Prop()
  price: number

  @Prop()
  description: string

  orders?: Order[]
}

export type ItemDocument = Item & Document

export const ItemSchema = SchemaFactory.createForClass(Item)
