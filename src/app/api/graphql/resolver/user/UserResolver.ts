import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { GetUserUseCase } from '@core/domain/user/usecase/GetUserUseCase';
import { UserToken } from '@app/token/UserToken';

import { GetProfileUseCase } from '@core/domain/profile/usecase/CreateProfileUseCase';
import { ProfileUseCaseDto } from '@core/domain/profile/usecase/dto/ProfileUseCaseDto';
import { ProfileToken } from '@app/token/ProfileToken';
import { GetProfileAdapter } from '@infra/adapter/profile/usecase/GetProfileAdapter';

import { UserModel } from '@app/api/graphql/model/UserModel';
import { ProfileModel } from '@app/api/graphql/model/ProfileModel';

/**
 * 사용자 정보 관련 리졸버
 */
@Resolver(() => UserModel)
export class UserResolver {
  private readonly getUserUseCase: GetUserUseCase;

  private readonly getProfileUseCase: GetProfileUseCase;

  public constructor(
    @Inject(UserToken.GetUserUseCase) getUserUseCase: GetUserUseCase,
    @Inject(ProfileToken.GetProfileUseCase) getProfileUseCase: GetProfileUseCase,
  ) {
    this.getUserUseCase = getUserUseCase;
    this.getProfileUseCase = getProfileUseCase;
  }

  @Query(() => ProfileModel)
  public async testProfileview(@Args('profileId') profileId: number) {
    const adapter: GetProfileAdapter = await GetProfileAdapter.new({ profileId });
    const profile: ProfileUseCaseDto = await this.getProfileUseCase.execute(adapter);

    return profile;
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
