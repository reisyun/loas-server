import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { InfraModule } from '@app/module/InfraModule';
import { AuthModule } from '@app/module/AuthModule';
import { UserModule } from '@app/module/UserModule';
import { HistoryModule } from '@app/module/HistoryModule';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    InfraModule,
    AuthModule,
    UserModule,
    HistoryModule,
  ],
})
export class RootModule {}
