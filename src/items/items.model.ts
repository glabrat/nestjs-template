import { Field, ID, ObjectType } from '@nestjs/graphql'
import { prop } from '@typegoose/typegoose'

import { Order } from 'src/orders/orders.model'
import { BaseModel } from 'src/shared/base.model'

@ObjectType()
export class Item extends BaseModel {
  @Field(() => ID)
  id: string

  @prop()
  title: string

  @prop()
  price: number

  @prop()
  description: string

  orders?: Order[]
}
