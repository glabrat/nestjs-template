import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User } from 'src/users/users.model'

import { OrderInput, UpdateOrderInput } from './orders.input'
import { Order, OrderDocument } from './orders.model'

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async create(createItemDto: OrderInput): Promise<Order> {
    const createdItem = new this.orderModel(createItemDto)

    return createdItem.save()
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec()
  }

  async find(input: Partial<OrderInput>): Promise<Order[]> {
    return this.orderModel.find(input).exec()
  }

  async findOne(id: string): Promise<Order> {
    return this.orderModel.findOne({ _id: id })
  }

  async delete(id: string, user: User, canDoAny: boolean): Promise<Order> {
    if (canDoAny) return this.orderModel.findByIdAndRemove(id)

    return this.orderModel.findOneAndRemove({ id, userId: user.id })
  }

  async update(
    id: string,
    user: User,
    item: UpdateOrderInput,
    canDoAny: boolean,
  ): Promise<Order> {
    if (canDoAny)
      return this.orderModel.findByIdAndUpdate(id, item, { new: true })

    return this.orderModel.findOneAndUpdate(
      { _id: id, userId: user.id },
      item,
      {
        new: true,
      },
    )
  }
}
