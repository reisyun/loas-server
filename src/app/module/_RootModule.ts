import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from '@app/module/UserModule';
import { AuthModule } from '@app/module/AuthModule';
import { LibraryModule } from '@app/module/LibraryModule';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    AuthModule,
    UserModule,
    LibraryModule,
  ],
})
export class RootModule {}
