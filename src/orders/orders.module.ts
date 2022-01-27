import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ItemsModule } from 'src/items/items.module'
import { UsersModule } from 'src/users/users.module'

import { Order } from './orders.model'
import { OrdersResolver } from './orders.resolver'
import { OrdersService } from './orders.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: Order }]),
    forwardRef(() => UsersModule),
    forwardRef(() => ItemsModule),
  ],
  providers: [OrdersService, OrdersResolver],
  exports: [OrdersService],
})
export class OrdersModule {}
