import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'

import { User } from './users.schema'
import { UserInput } from './users.input'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async create(input: UserInput): Promise<User> {
    const createdItem = new this.userModel(input)
    return await createdItem.save()
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec()
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id })
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email })
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id)
  }

  async update(id: string, user: UserInput): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true })
  }
}
