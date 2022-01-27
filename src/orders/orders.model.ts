import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop } from '@nestjs/mongoose'

import { Item } from 'src/items/items.model'
import { User } from 'src/users/users.model'

@ObjectType()
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
