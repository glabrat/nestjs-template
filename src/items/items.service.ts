import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ItemInput, UpdateItemInput } from './items.input'
import { Item } from './items.model'

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
  ) {}

  async create(createItemDto: ItemInput): Promise<Item> {
    const createdItem = new this.itemModel(createItemDto)

    return createdItem.save()
  }

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec()
  }

  async findOne(id: string): Promise<Item> {
    return this.itemModel.findOne({ _id: id })
  }

  async delete(id: string): Promise<Item> {
    return this.itemModel.findByIdAndRemove(id)
  }

  async update(id: string, item: UpdateItemInput): Promise<Item> {
    return this.itemModel.findByIdAndUpdate(id, item, { new: true })
  }

  async count(): Promise<number> {
    return this.itemModel.estimatedDocumentCount()
  }
}
