import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { QueryBusPort } from '@core/common/message/query/QueryBusPort';
import { GetUserQuery } from '@core/domain/user/handler/query/GetUserQuery';
import { GetUserQueryResult } from '@core/domain/user/handler/query/GetUserQueryResult';
import { Profile } from '@core/domain/profile/entity/Profile';
import { ProfileRepositoryPort } from '@core/domain/profile/port/persistence/ProfileRepositoryPort';
import { CreateProfilePort } from '@core/domain/profile/port/usecase/CreateProfilePort';
import { CreateProfileUseCase } from '@core/domain/profile/usecase/CreateProfileUseCase';
import { ProfileUseCaseDto } from '@core/domain/profile/usecase/dto/ProfileUseCaseDto';

export class CreateProfileService implements CreateProfileUseCase {
  private readonly profileRepository: ProfileRepositoryPort;

  private readonly queryBus: QueryBusPort;

  public constructor(profileRepository: ProfileRepositoryPort, queryBus: QueryBusPort) {
    this.profileRepository = profileRepository;
    this.queryBus = queryBus;
  }

  public async execute(payload: CreateProfilePort): Promise<ProfileUseCaseDto> {
    const { userId, shortBio, avatar, gender, language } = payload;

    // 데이터베이스에서 userId가 존재하는지 확인
    const doesUserExist: GetUserQueryResult = await this.queryBus.sendQuery(
      GetUserQuery.new({ id: userId }),
    );
    if (!doesUserExist) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Invalid user ID.',
      });
    }

    // Profile ID는 autoincrement로 설계, 영속성을 위해 DB 조회 필요
    const profileId = (await this.profileRepository.count()) + 1;

    const profile: Profile = await Profile.new({
      id: profileId,
      userId,
      shortBio,
      avatar,
      gender,
      language,
    });
    await this.profileRepository.create(profile);

    return ProfileUseCaseDto.newFromProfile(profile);
  }
}
