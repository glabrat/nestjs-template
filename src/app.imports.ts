import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule as TypegooseModule } from '@nestjs/mongoose'
import { TerminusModule } from '@nestjs/terminus'
import { AccessControlModule } from 'nestjs-role-protected'

import { roles } from './app.roles'

export const AppImports = [
  ConfigModule.forRoot({ isGlobal: true }),
  GraphQLModule.forRoot({
    autoSchemaFile: 'schema-generated.gql',
  }),
  TypegooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      uri: config.get<string>('MONGO_URI', process.env.MONGO_URI),
    }),
    inject: [ConfigService],
  }),
  AccessControlModule.forRoles(roles),
  TerminusModule,
]
