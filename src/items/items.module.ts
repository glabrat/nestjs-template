import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { OrdersModule } from 'src/orders/orders.module'

import { Item } from './items.model'
import { ItemsResolver } from './items.resolver'
import { ItemsService } from './items.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: Item }]),
    forwardRef(() => OrdersModule),
  ],
  providers: [ItemsService, ItemsResolver],
  exports: [ItemsService],
})
export class ItemsModule {}
