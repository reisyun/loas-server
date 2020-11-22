import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';
import { Profile } from '@core/domain/profile/entity/Profile';
import { ProfileRepositoryPort } from '@core/domain/profile/port/persistence/ProfileRepositoryPort';
import { EditProfilePort } from '@core/domain/profile/port/usecase/EditProfilePort';
import { EditProfileUseCase } from '@core/domain/profile/usecase/EditProfileUseCase';
import { ProfileUseCaseDto } from '@core/domain/profile/usecase/dto/ProfileUseCaseDto';

/**
 * 프로필 수정 서비스
 *
 * 1. 데이터베이스에서 profile 탐색, 없으면 error
 * 2. 데이터베이스에서 user 탐색, 없으면 null
 * 3. 각각 찾은 userID가 동일한지 확인, 틀리면 error
 * 4. 입력받은 데이터를 통해 프로필 수정
 * 5. 프로필를 데이터베이스에 저장
 * 6. 프로필를 내보냄
 */
export class EditProfileService implements EditProfileUseCase {
  private readonly profileRepository: ProfileRepositoryPort;

  public constructor(profileRepository: ProfileRepositoryPort) {
    this.profileRepository = profileRepository;
  }

  public async execute(payload: EditProfilePort): Promise<ProfileUseCaseDto> {
    const { profileId, userId, shortBio, avatar, gender, language } = payload;

    const profile: Profile = CoreAssert.notEmpty(
      await this.profileRepository.findOne({ id: profileId }),
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
