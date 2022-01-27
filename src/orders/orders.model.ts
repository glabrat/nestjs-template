import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'

import { Item } from 'src/items/items.model'
import { User } from 'src/users/users.model'

@ObjectType()
@Schema()
export class Order {
  @Field(() => ID)
  id: string

  @Field(() => User)
  user: User

  @Field(() => Item)
  item: Item

  @Prop()
  userId: string

  @Prop()
  itemId: string

  @Prop()
  quantity: number
}

export type OrderDocument = Order & Document

export const OrderSchema = SchemaFactory.createForClass(Order)
