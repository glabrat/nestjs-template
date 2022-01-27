import {
  Field,
  HideField,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'

import { Roles } from 'src/app.roles'
import { Order } from 'src/orders/orders.model'

registerEnumType(Roles, {
  name: 'Roles',
  description: 'User role for permissions',
})

@ObjectType()
@Schema()
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

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)
