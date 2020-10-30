import { Resolver, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { GetUserUseCase } from '@core/domain/user/usecase/GetUserUseCase';
import { UserToken } from '@app/token/UserToken';
import { UserModel } from '@app/api/graphql/user/model/UserModel';

/**
 * 사용자 정보 관련 리졸버
 */
@Resolver(() => UserModel)
export class UserResolver {
  private readonly getUserUseCase: GetUserUseCase;

  public constructor(@Inject(UserToken.GetUserUseCase) getUserUseCase: GetUserUseCase) {
    this.getUserUseCase = getUserUseCase;
  }

  @Mutation()
  public async changeName() {
    // empty
  }

  @Mutation()
  public async changeEmail() {
    // empty
  }

  @Mutation()
  public async changePassword() {
    // empty
  }

  @Mutation()
  public async verifyEmail() {
    // empty
  }
}
