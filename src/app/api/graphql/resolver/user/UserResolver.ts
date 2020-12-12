import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { UserToken } from '@app/token/UserToken';
import { UserModel } from '@app/api/graphql/model/UserModel';
import { ProfileModel } from '@app/api/graphql/model/ProfileModel';

import { GetUserUseCase } from '@core/domain/user/usecase/GetUserUseCase';
import { GetUserArgs } from '@app/api/graphql/resolver/user/dto/GetUserArgs';
import { GetUserAdapter } from '@infra/adapter/user/usecase/GetUserAdapter';

import { EditUserProfileUseCase } from '@core/domain/user/usecase/EditUserProfileUseCase';
import { EditUserProfileArgs } from '@app/api/graphql/resolver/user/dto/EditUserProfileArgs';
import { EditUserProfileAdapter } from '@infra/adapter/user/usecase/EditUserProfileAdapter';

import { RemoveUserUseCase } from '@core/domain/user/usecase/RemoveUserUseCase';
import { RemoveUserArgs } from '@app/api/graphql/resolver/user/dto/RemoveUserArgs';
import { RemoveUserAdapter } from '@infra/adapter/user/usecase/RemoveUserAdapter';

import { ChangeUserPasswordUseCase } from '@core/domain/user/usecase/ChangeUserPasswordUseCase';
import { ChangeUserPasswordArgs } from '@app/api/graphql/resolver/user/dto/ChangeUserPasswordArgs';
import { ChangeUserPasswordAdapter } from '@infra/adapter/user/usecase/ChangeUserPasswordAdapter';

/**
 * 사용자 정보 관련 리졸버
 */
@Resolver(() => UserModel)
export class UserResolver {
  private readonly getUserUseCase: GetUserUseCase;

  private readonly editUserProfileUseCase: EditUserProfileUseCase;

  private readonly changeUserPasswordUseCase: ChangeUserPasswordUseCase;

  private readonly removeUserUseCase: RemoveUserUseCase;

  public constructor(
    @Inject(UserToken.GetUserUseCase) getUserUseCase: GetUserUseCase,
    @Inject(UserToken.EditUserProfileUseCase) editUserProfileUseCase: EditUserProfileUseCase,
    @Inject(UserToken.ChangeUserPasswordUseCase)
    changeUserPasswordUseCase: ChangeUserPasswordUseCase,
    @Inject(UserToken.RemoveUserUseCase) removeUserUseCase: RemoveUserUseCase,
  ) {
    this.getUserUseCase = getUserUseCase;
    this.editUserProfileUseCase = editUserProfileUseCase;
    this.changeUserPasswordUseCase = changeUserPasswordUseCase;
    this.removeUserUseCase = removeUserUseCase;
  }

  @Query(() => UserModel, { name: 'GetUser' })
  public async getUser(@Args() args: GetUserArgs): Promise<UserUseCaseDto> {
    const { userId, email } = args;

    const adapter: GetUserAdapter = await GetUserAdapter.new({ userId, email });
    const user: UserUseCaseDto = await this.getUserUseCase.execute(adapter);

    return user;
  }

  @Mutation(() => ProfileModel, { name: 'EditUserProfile' })
  public async editUserProfile(@Args() args: EditUserProfileArgs) {
    const { userId, shortBio, avatar, gender, language } = args;

    const adapter: EditUserProfileAdapter = await EditUserProfileAdapter.new({
      userId,
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
      userId,
      oldPassword,
      newPassword,
    });
    const user: UserUseCaseDto = await this.changeUserPasswordUseCase.execute(adapter);

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
  // public async verifyEmail() {
  //   // empty
  // }
}
