import { InternalServerErrorException } from '@nestjs/common'
import { DocumentType, ReturnModelType } from '@typegoose/typegoose'
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types'
import { MongoError } from 'mongodb'
import { Query, QueryWithHelpers, Types } from 'mongoose'

import { BaseModel } from './base.model'

type QueryList<T extends BaseModel> = QueryWithHelpers<
  Array<DocumentType<T>>,
  DocumentType<T>
>
type QueryItem<T extends BaseModel> = QueryWithHelpers<
  DocumentType<T>,
  DocumentType<T>
>

export abstract class BaseService<T extends BaseModel> {
  protected model: ReturnModelType<AnyParamConstructor<T>>

  protected constructor(model: ReturnModelType<AnyParamConstructor<T>>) {
    this.model = model
  }

  protected static throwMongoError(err: MongoError): void {
    throw new InternalServerErrorException(err, err.errmsg)
  }

  protected static toObjectId(id: string): Types.ObjectId {
    try {
      return new Types.ObjectId(id)
    } catch (e) {
      this.throwMongoError(e)
    }
  }

  createModel(doc?: Partial<T>): T {
    return new this.model(doc)
  }

  findAlls(filter = {}): QueryList<T> {
    return this.model.find(filter)
  }

  async findAllAsync(filter = {}): Promise<Array<DocumentType<T>>> {
    try {
      return await this.findAlls(filter).exec()
    } catch (e) {
      BaseService.throwMongoError(e)
    }
  }

  findOnes(filter = {}): QueryItem<T> {
    return this.model.findOne(filter)
  }

  async findOneAsync(filter = {}): Promise<DocumentType<T>> {
    try {
      return await this.findOnes(filter).exec()
    } catch (e) {
      BaseService.throwMongoError(e)
    }
  }

  findById(id: string): QueryItem<T> {
    return this.model.findById(BaseService.toObjectId(id))
  }

  async findByIdAsync(id: string): Promise<DocumentType<T>> {
    try {
      return await this.findById(id).exec()
    } catch (e) {
      BaseService.throwMongoError(e)
    }
  }

  async creates(item: T): Promise<DocumentType<T>> {
    try {
      return await this.model.create(item)
    } catch (e) {
      BaseService.throwMongoError(e)
    }
  }

  deletes(filter = {}): QueryItem<T> {
    return this.model.findOneAndDelete(filter)
  }

  async deleteAsyncs(filter = {}): Promise<DocumentType<T>> {
    try {
      return await this.deletes(filter).exec()
    } catch (e) {
      BaseService.throwMongoError(e)
    }
  }

  deleteById(id: string): QueryItem<T> {
    return this.model.findByIdAndDelete(BaseService.toObjectId(id))
  }

  async deleteByIdAsync(id: string): Promise<DocumentType<T>> {
    try {
      return await this.deleteById(id).exec()
    } catch (e) {
      BaseService.throwMongoError(e)
    }
  }

  updates(item: T): QueryItem<T> {
    return this.model.findByIdAndUpdate(BaseService.toObjectId(item.id), item, {
      new: true,
    })
  }

  async updateAsync(item: T): Promise<DocumentType<T>> {
    try {
      return await this.updates(item).exec()
    } catch (e) {
      BaseService.throwMongoError(e)
    }
  }

  counts(filter = {}): QueryWithHelpers<number, any> {
    return this.model.count(filter)
  }

  async countAsync(filter = {}): Promise<number> {
    try {
      return await this.counts(filter)
    } catch (e) {
      BaseService.throwMongoError(e)
    }
  }
}
