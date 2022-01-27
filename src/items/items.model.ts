import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop } from '@nestjs/mongoose'

import { Order } from 'src/orders/orders.model'

@ObjectType()
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
