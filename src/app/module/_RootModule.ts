import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { InfraModule } from '@app/module/InfraModule';
import { UserModule } from '@app/module/UserModule';
import { AuthModule } from '@app/module/AuthModule';
import { ProfileModule } from '@app/module/ProfileModule';
import { CollectionModule } from '@app/module/CollectionModule';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    InfraModule,
    AuthModule,
    UserModule,
    ProfileModule,
    CollectionModule,
  ],
})
export class RootModule {}
