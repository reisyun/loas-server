import { v4 } from 'uuid';
import { Test, TestingModule } from '@nestjs/testing';
import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { ClassValidationDetails } from '@core/common/util/ClassValidator';
import { User } from '@core/domain/user/entity/User';
import { Profile } from '@core/domain/user/entity/Profile';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { EditUserProfilePort } from '@core/domain/user/port/usecase/EditUserProfilePort';
import { EditUserProfileUseCase } from '@core/domain/user/usecase/EditUserProfileUseCase';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { EditUserProfileService } from '@core/service/user/usecase/EditUserProfileService';
import { UserToken } from '@app/token/UserToken';
import { UserRepositoryAdapter } from '@infra/adapter/user/persistence/UserRepositoryAdapter';

async function upsertUser(editShortBio?: string) {
  return User.new({
    profile: await Profile.new({ id: 0, shortBio: editShortBio }),
    id: v4(),
    name: 'Name',
    email: 'user@test.io',
    password: '12345678',
  });
}

describe('CreateUserService', () => {
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
      const mockUser: User = await upsertUser();

      const editShortBio = 'hello?';
      const mockEditedUser: User = await upsertUser(editShortBio);

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(userRepository, 'update').mockResolvedValue(mockEditedUser);

      const expectedUserUseCaseDto: UserUseCaseDto = await UserUseCaseDto.newFromUser(mockUser);

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

    test("Expect it doesn't edit user profile", async () => {
      const mockUser: User = await upsertUser();

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(userRepository, 'update').mockResolvedValue(mockUser);

      const expectedUserUseCaseDto: UserUseCaseDto = await UserUseCaseDto.newFromUser(mockUser);

      const editUserProfilePort: EditUserProfilePort = { userId: mockUser.getId };
      const resultUserUseCaseDto: UserUseCaseDto = await editUserProfileService.execute(
        editUserProfilePort,
      );

      expect(resultUserUseCaseDto).toEqual(expectedUserUseCaseDto);
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
