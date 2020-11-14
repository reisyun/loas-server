import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { GetUserUseCase } from '@core/domain/user/usecase/GetUserUseCase';
import { CreateUserUseCase } from '@core/domain/user/usecase/CreateUserUseCase';
import { UserToken } from '@app/token/UserToken';
import { HttpUser } from '@app/api/graphql/auth/decorator/HttpUser';
import { HttpUserPayload } from '@app/api/graphql/auth/type/HttpAuthTypes';
import { HttpAuthService } from '@app/api/graphql/auth/HttpAuthService';
import { HttpJwtAuthGuard } from '@app/api/graphql/auth/guard/HttpJwtAuthGuard';
import { UserModel } from '@app/api/graphql/model/UserModel';
import { AuthModel } from '@app/api/graphql/model/AuthModel';
import { SigninArgs } from '@app/api/graphql/resolver/auth/dto/SigninArgs';
import { SignupArgs } from '@app/api/graphql/resolver/auth/dto/SignupArgs';
import { CreateUserAdapter } from '@infra/adapter/user/usecase/CreateUserAdapter';
import { GetUserAdapter } from '@infra/adapter/user/usecase/GetUserAdapter';

/**
 * 사용자 인증 관련 리졸버
 */
@Resolver(() => UserModel)
export class AuthResolver {
  private readonly getUserUseCase: GetUserUseCase;

  private readonly createUserUseCase: CreateUserUseCase;

  private readonly authService: HttpAuthService;

  public constructor(
    @Inject(UserToken.GetUserUseCase) getUserUseCase: GetUserUseCase,
    @Inject(UserToken.CreateUserUseCase) createUserUseCase: CreateUserUseCase,
    authService: HttpAuthService,
  ) {
    this.getUserUseCase = getUserUseCase;
    this.createUserUseCase = createUserUseCase;
    this.authService = authService;
  }

  /**
   * 내 정보
   *
   * 토큰을 발급 받았던 유저의 정보
   *
   * @param httpUser 토큰을 파싱 후 추출 된 유저 정보
   * @returns {UserModel} GraphQL User model
   */
  @Query(() => UserModel, { name: 'Me' })
  @UseGuards(HttpJwtAuthGuard)
  public async me(@HttpUser() httpUser: HttpUserPayload): Promise<UserModel> {
    const adapter: GetUserAdapter = await GetUserAdapter.new({ userId: httpUser.id });
    const user: UserUseCaseDto = await this.getUserUseCase.execute(adapter);

    return user;
  }

  /**
   * 로그인
   *
   * email, password 입력 받아 유저를 색인 후 토큰 발급
   *
   * @param args email, password
   * @returns {AuthModel} GraphQL Auth model
   */
  @Mutation(() => AuthModel, { name: 'Signin' })
  public async signin(@Args() args: SigninArgs): Promise<AuthModel> {
    const { email, password } = args;

    const isValidUser = await this.authService.validateUser(email, password);
    const accessToken: string = this.authService.generateToken({ id: isValidUser.getId });

    // User entity를 User model DTO에 맞도록 변환
    const adapter: GetUserAdapter = await GetUserAdapter.new({ userId: isValidUser.getId });
    const user: UserUseCaseDto = await this.getUserUseCase.execute(adapter);

    return {
      accessToken,
      user,
    };
  }

  /**
   * 회원가입
   *
   * name, email, password 입력 받아 유저를 생성
   *
   * @param args name, email, password
   * @returns {UserModel} GraphQL User model
   */
  @Mutation(() => UserModel, { name: 'Signup' })
  public async signup(@Args() args: SignupArgs): Promise<UserModel> {
    const { name, email, password } = args;

    const userAdapter: CreateUserAdapter = await CreateUserAdapter.new({ name, email, password });
    const user: UserUseCaseDto = await this.createUserUseCase.execute(userAdapter);

    return user;
  }
}
