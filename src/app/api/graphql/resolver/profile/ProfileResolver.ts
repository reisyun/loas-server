import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { ProfileUseCaseDto } from '@core/domain/profile/usecase/dto/ProfileUseCaseDto';
import { ProfileToken } from '@app/token/ProfileToken';
import { ProfileModel } from '@app/api/graphql/model/ProfileModel';

import { GetProfileUseCase } from '@core/domain/profile/usecase/GetProfileUseCase';
import { GetProfileArgs } from '@app/api/graphql/resolver/profile/dto/GetProfileArgs';
import { GetProfileAdapter } from '@infra/adapter/profile/usecase/GetProfileAdapter';

import { EditProfileUseCase } from '@core/domain/profile/usecase/EditProfileUseCase';
import { EditProfileArgs } from '@app/api/graphql/resolver/profile/dto/EditProfileArgs';
import { EditProfileAdapter } from '@infra/adapter/profile/usecase/EditProfileAdapter';

/**
 * 프로필 정보 관련 리졸버
 */
@Resolver(() => ProfileModel)
export class ProfileResolver {
  private readonly getProfileUseCase: GetProfileUseCase;

  private readonly editProfileUseCase: EditProfileUseCase;

  public constructor(
    @Inject(ProfileToken.GetProfileUseCase) getProfileUseCase: GetProfileUseCase,
    @Inject(ProfileToken.EditProfileUseCase) editProfileUseCase: EditProfileUseCase,
  ) {
    this.getProfileUseCase = getProfileUseCase;
    this.editProfileUseCase = editProfileUseCase;
  }

  @Query(() => ProfileModel, { name: 'GetProfile' })
  public async getProfile(@Args() args: GetProfileArgs): Promise<ProfileModel> {
    const { profileId } = args;

    const adapter: GetProfileAdapter = await GetProfileAdapter.new({ profileId });
    const profile: ProfileUseCaseDto = await this.getProfileUseCase.execute(adapter);

    return profile;
  }

  @Mutation(() => ProfileModel, { name: 'EditProfile' })
  public async editProfile(@Args() args: EditProfileArgs): Promise<ProfileModel> {
    const { profileId, userId, shortBio, avatar, gender, language } = args;

    const adapter: EditProfileAdapter = await EditProfileAdapter.new({
      profileId,
      userId,
      shortBio,
      avatar,
      gender,
      language,
    });
    const editedProfile: ProfileUseCaseDto = await this.editProfileUseCase.execute(adapter);

    return editedProfile;
  }
}
