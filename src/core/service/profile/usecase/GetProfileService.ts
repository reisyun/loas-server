import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';
import { Profile } from '@core/domain/profile/entity/Profile';
import { ProfileRepositoryPort } from '@core/domain/profile/port/persistence/ProfileRepositoryPort';
import { GetProfilePort } from '@core/domain/profile/port/usecase/GetProfilePort';
import { ProfileUseCaseDto } from '@core/domain/profile/usecase/dto/ProfileUseCaseDto';
import { GetProfileUseCase } from '@core/domain/profile/usecase/GetProfileUseCase';

export class GetProfileService implements GetProfileUseCase {
  private readonly profileRepository: ProfileRepositoryPort;

  public constructor(profileRepository: ProfileRepositoryPort) {
    this.profileRepository = profileRepository;
  }

  public async execute(payload: GetProfilePort): Promise<ProfileUseCaseDto> {
    const { profileId, userId } = payload;

    const profile: Profile = CoreAssert.notEmpty(
      await this.profileRepository.findOne({ id: profileId, userId }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Profile not found.',
      }),
    );

    return ProfileUseCaseDto.newFromProfile(profile);
  }
}
