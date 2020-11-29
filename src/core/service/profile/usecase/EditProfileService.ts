import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';
import { Profile } from '@core/domain/profile/entity/Profile';
import { ProfileRepositoryPort } from '@core/domain/profile/port/persistence/ProfileRepositoryPort';
import { EditProfilePort } from '@core/domain/profile/port/usecase/EditProfilePort';
import { EditProfileUseCase } from '@core/domain/profile/usecase/EditProfileUseCase';
import { ProfileUseCaseDto } from '@core/domain/profile/usecase/dto/ProfileUseCaseDto';

export class EditProfileService implements EditProfileUseCase {
  private readonly profileRepository: ProfileRepositoryPort;

  public constructor(profileRepository: ProfileRepositoryPort) {
    this.profileRepository = profileRepository;
  }

  public async execute(payload: EditProfilePort): Promise<ProfileUseCaseDto> {
    const { profileId, userId, shortBio, avatar, gender, language } = payload;

    const profile: Profile = CoreAssert.notEmpty(
      await this.profileRepository.findOne({ where: { id: profileId } }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Profile not found.',
      }),
    );

    const hasAccess: boolean = userId === profile.getUserId;
    CoreAssert.isTrue(hasAccess, Exception.new({ code: Code.ACCESS_DENIED_ERROR }));

    await profile.edit({ shortBio, avatar, gender, language });
    await this.profileRepository.update(profile);

    return ProfileUseCaseDto.newFromProfile(profile);
  }
}
