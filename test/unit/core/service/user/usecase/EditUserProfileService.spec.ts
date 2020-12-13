import { v4 } from 'uuid';
import { Test, TestingModule } from '@nestjs/testing';
import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { ClassValidationDetails } from '@core/common/util/ClassValidator';
import { User } from '@core/domain/user/entity/User';
import { Profile } from '@core/domain/user/value-object/Profile';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { EditUserProfilePort } from '@core/domain/user/port/usecase/EditUserProfilePort';
import { EditUserProfileUseCase } from '@core/domain/user/usecase/EditUserProfileUseCase';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { EditUserProfileService } from '@core/service/user/usecase/EditUserProfileService';
import { UserToken } from '@app/token/UserToken';
import { UserRepositoryAdapter } from '@infra/adapter/user/persistence/UserRepositoryAdapter';

async function createUser() {
  return User.new({
    profile: await Profile.new(),
    name: 'Name',
    email: 'user@test.io',
    password: '12345678',
  });
}

describe('EditUserProfileService', () => {
  let editUserProfileService: EditUserProfileUseCase;
  let userRepository: UserRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserToken.EditUserProfileUseCase,
          useFactory: userRepository => new EditUserProfileService(userRepository),
          inject: [UserToken.UserRepository],
        },
        {
          provide: UserToken.UserRepository,
          useClass: UserRepositoryAdapter,
        },
      ],
    }).compile();

    editUserProfileService = module.get<EditUserProfileUseCase>(UserToken.EditUserProfileUseCase);
    userRepository = module.get<UserRepositoryPort>(UserToken.UserRepository);
  });

  describe('execute', () => {
    test('Expect it edit user profile', async () => {
      const mockUser: User = await createUser();

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(userRepository, 'update').mockResolvedValue(undefined);

      jest.spyOn(userRepository, 'update').mockClear();

      const expectedUserUseCaseDto: UserUseCaseDto = await UserUseCaseDto.newFromUser(mockUser);

      const editShortBio = 'hello';
      const editUserProfilePort: EditUserProfilePort = {
        userId: mockUser.getId,
        shortBio: editShortBio,
      };

      const resultUserUseCaseDto: UserUseCaseDto = await editUserProfileService.execute(
        editUserProfilePort,
      );

      expect(resultUserUseCaseDto).not.toEqual(expectedUserUseCaseDto);
      expect(resultUserUseCaseDto.profile.shortBio).toBe(editShortBio);
    });

    test('When user not found, expect it throws Exception', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      expect.hasAssertions();

      try {
        const editUserProfilePort: EditUserProfilePort = { userId: v4() };
        await editUserProfileService.execute(editUserProfilePort);
      } catch (error) {
        const exception: Exception<ClassValidationDetails> = error;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.ENTITY_NOT_FOUND_ERROR.code);
      }
    });
  });
});
