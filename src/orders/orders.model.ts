import { Field, ID, ObjectType } from '@nestjs/graphql'
import { prop } from '@typegoose/typegoose'

import { Item } from 'src/items/items.model'
import { BaseModel } from 'src/shared/base.model'
import { User } from 'src/users/users.model'

@ObjectType()
export class Order extends BaseModel {
  @Field(() => ID)
  id: string

  @Field(() => User)
  user: User

  @Field(() => Item)
  item: Item

  @prop()
  userId: string

  @prop()
  itemId: string

  @prop()
  quantity: number
}
