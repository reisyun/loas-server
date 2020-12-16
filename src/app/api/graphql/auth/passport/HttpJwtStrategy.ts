import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';
import { User } from '@core/domain/user/entity/User';
import { HttpAuthService } from '@app/api/graphql/auth/HttpAuthService';
import { HttpJwtPayload } from '@app/api/graphql/auth/type/HttpAuthTypes';
import { ApiServerConfig } from '@infra/config/ApiServerConfig';

@Injectable()
export class HttpJwtStrategy extends PassportStrategy(Strategy) {
  private readonly authService: HttpAuthService;

  public constructor(authService: HttpAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ApiServerConfig.ACCESS_TOKEN_SECRET,
    });

    this.authService = authService;
  }

  public async validate(payload: HttpJwtPayload): Promise<User> {
    const user: User = CoreAssert.notEmpty(
      await this.authService.getUser(payload),
      Exception.new({ code: Code.UNAUTHORIZED_ERROR }),
    );

    return user;
  }
}
