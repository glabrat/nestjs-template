import {
  Field,
  HideField,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'
import { Prop } from '@nestjs/mongoose'

import { Roles } from 'src/app.roles'
import { Order } from 'src/orders/orders.model'

registerEnumType(Roles, {
  name: 'Roles',
  description: 'User role for permissions',
})

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string

  @Prop({ unique: true })
  email: string

  @HideField()
  @Prop({ required: true })
  password: string

  @Prop()
  firstName?: string

  @Prop()
  lastName?: string

  @Prop({ type: String, enum: Roles, default: Roles.USER })
  roles?: Roles[]

  orders?: Order[]
}
