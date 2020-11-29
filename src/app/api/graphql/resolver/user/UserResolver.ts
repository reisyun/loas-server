import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { UserToken } from '@app/token/UserToken';
import { UserModel } from '@app/api/graphql/model/UserModel';

import { GetUserUseCase } from '@core/domain/user/usecase/GetUserUseCase';
import { GetUserArgs } from '@app/api/graphql/resolver/user/dto/GetUserArgs';
import { GetUserAdapter } from '@infra/adapter/user/usecase/GetUserAdapter';

import { RemoveUserUseCase } from '@core/domain/user/usecase/RemoveUserUseCase';
import { RemoveUserArgs } from '@app/api/graphql/resolver/user/dto/RemoveUserArgs';
import { RemoveUserAdapter } from '@infra/adapter/user/usecase/RemoveUserAdapter';

/**
 * 사용자 정보 관련 리졸버
 */
@Resolver(() => UserModel)
export class UserResolver {
  private readonly getUserUseCase: GetUserUseCase;

  private readonly removeUserUseCase: RemoveUserUseCase;

  public constructor(
    @Inject(UserToken.GetUserUseCase) getUserUseCase: GetUserUseCase,
    @Inject(UserToken.RemoveUserUseCase) removeUserUseCase: RemoveUserUseCase,
  ) {
    this.getUserUseCase = getUserUseCase;
    this.removeUserUseCase = removeUserUseCase;
  }

  @Query(() => UserModel, { name: 'GetUser' })
  public async getUser(@Args() args: GetUserArgs): Promise<UserModel> {
    const { userId, email } = args;

    const adapter: GetUserAdapter = await GetUserAdapter.new({ userId, email });
    const user: UserUseCaseDto = await this.getUserUseCase.execute(adapter);

    return user;
  }

  @Mutation(() => Boolean, { name: 'RemoveUser' })
  public async removeUser(@Args() args: RemoveUserArgs): Promise<boolean> {
    const { userId, confirm } = args;

    const adapter: RemoveUserAdapter = await RemoveUserAdapter.new({ userId, confirm });
    await this.removeUserUseCase.execute(adapter);

    return true;
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
