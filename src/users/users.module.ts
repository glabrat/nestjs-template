import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { OrdersModule } from 'src/orders/orders.module'

import { User, UserSchema } from './users.model'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => OrdersModule),
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
