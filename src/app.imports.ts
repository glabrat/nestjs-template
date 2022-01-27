import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { TerminusModule } from '@nestjs/terminus'

export const AppImports = [
  ConfigModule.forRoot({ isGlobal: true }),
  GraphQLModule.forRoot({
    autoSchemaFile: 'schema-generated.gql',
  }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      uri: config.get<string>('MONGO_URI', process.env.MONGO_URI),
    }),
    inject: [ConfigService],
  }),
  TerminusModule,
]
