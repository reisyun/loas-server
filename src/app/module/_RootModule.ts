import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { InfraModule } from '@app/module/InfraModule';
import { UserModule } from '@app/module/UserModule';
import { AuthModule } from '@app/module/AuthModule';
import { CollectionModule } from '@app/module/CollectionModule';
import { CollectionItemModule } from '@app/module/CollectionItemModule';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    InfraModule,
    AuthModule,
    UserModule,
    CollectionModule,
    CollectionItemModule,
  ],
})
export class RootModule {}
