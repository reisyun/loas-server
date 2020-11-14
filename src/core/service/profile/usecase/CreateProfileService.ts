import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';
import { Profile } from '@core/domain/profile/entity/Profile';
import { ProfileRepositoryPort } from '@core/domain/profile/port/persistence/ProfileRepositoryPort';
import { CreateProfilePort } from '@core/domain/profile/port/usecase/CreateProfilePort';
import { ProfileUseCaseDto } from '@core/domain/profile/usecase/dto/ProfileUseCaseDto';
import { CreateProfileUseCase } from '@core/domain/profile/usecase/CreateProfileUseCase';

export class CreateProfileService implements CreateProfileUseCase {
  private readonly profileRepository: ProfileRepositoryPort;

  public constructor(profileRepository: ProfileRepositoryPort) {
    this.profileRepository = profileRepository;
  }

  public async execute(payload: CreateProfilePort): Promise<ProfileUseCaseDto> {
    const { userId, gender, language, shortBio, avatar } = payload;

    // TODO: 데이터베이스에서 userId가 존재하는지 확인
    CoreAssert.notEmpty(
      userId,
      Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        overrideMessage: 'userId is required',
      }),
    );

    const profile: Profile = await Profile.new({ userId, gender, language, shortBio, avatar });
    await this.profileRepository.create(userId, profile);

    return ProfileUseCaseDto.newFromProfile(profile);
  }
}
