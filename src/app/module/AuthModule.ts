import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@app/module/UserModule';
import { CollectionModule } from '@app/module/CollectionModule';
import { HttpAuthService } from '@app/api/graphql/auth/HttpAuthService';
import { HttpJwtStrategy } from '@app/api/graphql/auth/passport/HttpJwtStrategy';
import { AuthResolver } from '@app/api/graphql/resolver/auth/AuthResolver';
import { ApiServerConfig } from '@infra/config/ApiServerConfig';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: ApiServerConfig.ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: ApiServerConfig.ACCESS_TOKEN_EXPIRES_SEC_IN,
      },
    }),
    UserModule,
    CollectionModule,
  ],
  providers: [AuthResolver, HttpAuthService, HttpJwtStrategy],
})
export class AuthModule {}
