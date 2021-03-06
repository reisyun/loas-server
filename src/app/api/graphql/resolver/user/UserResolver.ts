import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

import { UserToken } from '@app/token/UserToken';
import { UserModel } from '@app/api/graphql/model/UserModel';
import { ProfileModel } from '@app/api/graphql/model/ProfileModel';

import { GetUserUseCase } from '@core/domain/user/usecase/GetUserUseCase';
import { GetUserArgs } from '@app/api/graphql/resolver/user/args/GetUserArgs';
import { GetUserAdapter } from '@infra/adapter/usecase/user/GetUserAdapter';

import { EditUserProfileUseCase } from '@core/domain/user/usecase/EditUserProfileUseCase';
import { EditUserProfileArgs } from '@app/api/graphql/resolver/user/args/EditUserProfileArgs';
import { EditUserProfileAdapter } from '@infra/adapter/usecase/user/EditUserProfileAdapter';

import { RemoveUserUseCase } from '@core/domain/user/usecase/RemoveUserUseCase';
import { RemoveUserArgs } from '@app/api/graphql/resolver/user/args/RemoveUserArgs';
import { RemoveUserAdapter } from '@infra/adapter/usecase/user/RemoveUserAdapter';

import { ChangeUserPasswordUseCase } from '@core/domain/user/usecase/ChangeUserPasswordUseCase';
import { ChangeUserPasswordArgs } from '@app/api/graphql/resolver/user/args/ChangeUserPasswordArgs';
import { ChangeUserPasswordAdapter } from '@infra/adapter/usecase/user/ChangeUserPasswordAdapter';

/**
 * 사용자 정보 관련 리졸버
 */
@Resolver(() => UserModel)
export class UserResolver {
  public constructor(
    @Inject(UserToken.GetUserUseCase)
    private readonly getUserUseCase: GetUserUseCase,

    @Inject(UserToken.EditUserProfileUseCase)
    private readonly editUserProfileUseCase: EditUserProfileUseCase,

    @Inject(UserToken.ChangeUserPasswordUseCase)
    private readonly changeUserPasswordUseCase: ChangeUserPasswordUseCase,

    @Inject(UserToken.RemoveUserUseCase)
    private readonly removeUserUseCase: RemoveUserUseCase,
  ) {}

  @Query(() => UserModel, { name: 'GetUser' })
  public async getUser(@Args() args: GetUserArgs): Promise<UserUseCaseDto> {
    const { userId, email } = args;

    const adapter: GetUserAdapter = await GetUserAdapter.new({
      executorId: userId,
      email,
    });
    const user: UserUseCaseDto = await this.getUserUseCase.execute(adapter);

    return user;
  }

  @Mutation(() => ProfileModel, { name: 'EditUserProfile' })
  public async editUserProfile(
    @Args() args: EditUserProfileArgs,
  ): Promise<UserUseCaseDto['profile']> {
    const { userId, shortBio, avatar, gender, language } = args;

    const adapter: EditUserProfileAdapter = await EditUserProfileAdapter.new({
      executorId: userId,
      shortBio,
      avatar,
      gender,
      language,
    });
    const user: UserUseCaseDto = await this.editUserProfileUseCase.execute(adapter);

    return user.profile;
  }

  @Mutation(() => UserModel, { name: 'ChangeUserPassword' })
  public async changeUserPassword(@Args() args: ChangeUserPasswordArgs): Promise<UserUseCaseDto> {
    const { userId, oldPassword, newPassword } = args;

    const adapter: ChangeUserPasswordAdapter = await ChangeUserPasswordAdapter.new({
      executorId: userId,
      oldPassword,
      newPassword,
    });
    const user: UserUseCaseDto = await this.changeUserPasswordUseCase.execute(adapter);

    return user;
  }

  @Mutation(() => Boolean, { name: 'RemoveUser' })
  public async removeUser(@Args() args: RemoveUserArgs): Promise<boolean> {
    const { userId, confirm } = args;

    const adapter: RemoveUserAdapter = await RemoveUserAdapter.new({
      executorId: userId,
      confirm,
    });
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
}
