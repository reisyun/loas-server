import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { UserToken } from '@app/token/UserToken';
import { UserModel } from '@app/api/graphql/model/UserModel';

import { GetUserUseCase } from '@core/domain/user/usecase/GetUserUseCase';

/**
 * 사용자 정보 관련 리졸버
 */
@Resolver(() => UserModel)
export class UserResolver {
  private readonly getUserUseCase: GetUserUseCase;

  public constructor(@Inject(UserToken.GetUserUseCase) getUserUseCase: GetUserUseCase) {
    this.getUserUseCase = getUserUseCase;
  }

  // @Mutation()
  // public async changeName() {
  //   // empty
  // }

  // @Mutation()
  // public async changeEmail() {
  //   // empty
  // }

  // @Mutation()
  // public async changePassword() {
  //   // empty
  // }

  // @Mutation()
  // public async verifyEmail() {
  //   // empty
  // }
}
