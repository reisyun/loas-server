import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { Nullable } from '@core/common/Types';
import { User } from '@core/domain/user/entity/User';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { UserToken } from '@app/token/UserToken';
import { HttpJwtPayload } from '@app/api/graphql/auth/type/HttpAuthTypes';

@Injectable()
export class HttpAuthService {
  private readonly userRepository: UserRepositoryPort;

  private readonly jwtService: JwtService;

  public constructor(
    @Inject(UserToken.UserRepository) userRepository: UserRepositoryPort,
    jwtService: JwtService,
  ) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }

  /**
   * 유저의 식별자를 통해 유저 정보 반환
   */
  public async getUser(where: { id?: string; email?: string }): Promise<Nullable<User>> {
    const user: Nullable<User> = await this.userRepository.findOne({ where });

    return user;
  }

  /**
   * email과 password를 검증 후 유저 정보 반환
   */
  public async validateUser(email: string, password: string): Promise<User> {
    const user: Nullable<User> = await this.getUser({ email });
    if (!user) {
      throw Exception.new({
        code: Code.UNAUTHORIZED_ERROR,
        overrideMessage: `No user found for email: ${email}`,
      });
    }

    const isPasswordValid: boolean = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw Exception.new({
        code: Code.UNAUTHORIZED_ERROR,
        overrideMessage: 'Invalid password',
      });
    }

    return user;
  }

  /**
   * payload를 받아 토큰을 발급
   */
  public generateToken(payload: HttpJwtPayload): string {
    const token = this.jwtService.sign(payload);

    return token;
  }
}
