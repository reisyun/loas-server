import { Resolver, Query, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { GetProfileUseCase } from '@core/domain/profile/usecase/GetProfileUseCase';
import { ProfileUseCaseDto } from '@core/domain/profile/usecase/dto/ProfileUseCaseDto';
import { ProfileToken } from '@app/token/ProfileToken';
import { ProfileModel } from '@app/api/graphql/model/ProfileModel';
import { GetProfileArgs } from '@app/api/graphql/resolver/profile/dto/GetProfileArgs';
import { GetProfileAdapter } from '@infra/adapter/profile/usecase/GetProfileAdapter';

/**
 * 프로필 정보 관련 리졸버
 */
@Resolver(() => ProfileModel)
export class ProfileResolver {
  private readonly getProfileUseCase: GetProfileUseCase;

  public constructor(@Inject(ProfileToken.GetProfileUseCase) getProfileUseCase: GetProfileUseCase) {
    this.getProfileUseCase = getProfileUseCase;
  }

  @Query(() => ProfileModel, { name: 'GetProfile' })
  public async getProfile(@Args() args: GetProfileArgs) {
    const { profileId, userId } = args;

    const adapter: GetProfileAdapter = await GetProfileAdapter.new({ profileId, userId });
    const profile: ProfileUseCaseDto = await this.getProfileUseCase.execute(adapter);

    return profile;
  }

  // @Mutation(() => ProfileModel)
  // public async changeGender(@Args() args) {
  //   // empty
  // }
}
