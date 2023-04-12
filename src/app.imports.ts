import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TerminusModule } from '@nestjs/terminus'
import { TypegooseModule } from '@m8a/nestjs-typegoose'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';


export const AppImports = [
  ConfigModule.forRoot({ isGlobal: true }),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: 'schema.gql',
    subscriptions: {
      'graphql-ws': true
    },
  }),
  TypegooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      uri: config.get<string>('MONGO_URI', process.env.MONGO_URI),
      // useNewUrlParser: true,
      // useCreateIndex: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
    }),
    inject: [ConfigService],
  }),
//   AccessControlModule.forRoles(roles),
  TerminusModule,
]