import { v4 } from 'uuid';
import { Test, TestingModule } from '@nestjs/testing';
import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { ClassValidationDetails } from '@core/common/util/ClassValidator';
import { User } from '@core/domain/user/entity/User';
import { Profile } from '@core/domain/user/value-object/Profile';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { GetUserPort } from '@core/domain/user/port/usecase/GetUserPort';
import { GetUserUseCase } from '@core/domain/user/usecase/GetUserUseCase';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { GetUserService } from '@core/service/user/usecase/GetUserService';
import { UserToken } from '@app/token/UserToken';
import { UserRepositoryAdapter } from '@infra/adapter/user/persistence/UserRepositoryAdapter';

async function createUser(): Promise<User> {
  return User.new({
    profile: await Profile.new(),
    name: 'Name',
    email: 'user@test.io',
    password: '12345678',
  });
}

describe('GetUserService', () => {
  let getUserService: GetUserUseCase;
  let userRepository: UserRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserToken.GetUserUseCase,
          useFactory: userRepository => new GetUserService(userRepository),
          inject: [UserToken.UserRepository],
        },
        {
          provide: UserToken.UserRepository,
          useClass: UserRepositoryAdapter,
        },
      ],
    }).compile();

    getUserService = module.get<GetUserUseCase>(UserToken.GetUserUseCase);
    userRepository = module.get<UserRepositoryPort>(UserToken.UserRepository);
  });

  describe('execute', () => {
    test('Expect it return user', async () => {
      const mockUser: User = await createUser();

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

      const expectedUserUseCaseDto: UserUseCaseDto = await UserUseCaseDto.newFromUser(mockUser);

      const getUserPort: GetUserPort = { userId: mockUser.getId };
      const resultUserUseCaseDto: UserUseCaseDto = await getUserService.execute(getUserPort);

      expect(resultUserUseCaseDto).toEqual(expectedUserUseCaseDto);
    });

    test('When user not found, expect it throws Exception', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      expect.hasAssertions();

      try {
        const getUserPort: GetUserPort = { userId: v4() };
        await getUserService.execute(getUserPort);
      } catch (error) {
        const exception: Exception<ClassValidationDetails> = error;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.ENTITY_NOT_FOUND_ERROR.code);
      }
    });
  });
});
