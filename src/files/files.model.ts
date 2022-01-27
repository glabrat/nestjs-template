import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop } from '@nestjs/mongoose'

@ObjectType()
export class File {
  @Field(() => ID)
  @Prop({ required: true })
  url: string

  @Prop({ required: true })
  success: boolean
}
