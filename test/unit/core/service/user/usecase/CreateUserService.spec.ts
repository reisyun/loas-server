import { v4 } from 'uuid';
import { Test, TestingModule } from '@nestjs/testing';
import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { ClassValidationDetails } from '@core/common/util/ClassValidator';
import { User } from '@core/domain/user/entity/User';
import { Profile } from '@core/domain/user/value-object/Profile';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { CreateUserPort } from '@core/domain/user/port/usecase/CreateUserPort';
import { CreateUserUseCase } from '@core/domain/user/usecase/CreateUserUseCase';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { CreateUserService } from '@core/service/user/usecase/CreateUserService';
import { UserToken } from '@app/token/UserToken';
import { UserRepositoryAdapter } from '@infra/adapter/user/persistence/UserRepositoryAdapter';

function createPort(): CreateUserPort {
  return {
    name: 'Name',
    email: 'user@test.io',
    password: '123456',
  };
}

describe('CreateUserService', () => {
  let createUserService: CreateUserUseCase;
  let userRepository: UserRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserToken.CreateUserUseCase,
          useFactory: userRepository => new CreateUserService(userRepository),
          inject: [UserToken.UserRepository],
        },
        {
          provide: UserToken.UserRepository,
          useClass: UserRepositoryAdapter,
        },
      ],
    }).compile();

    createUserService = module.get<CreateUserUseCase>(UserToken.CreateUserUseCase);
    userRepository = module.get<UserRepositoryPort>(UserToken.UserRepository);
  });

  describe('execute', () => {
    test('Expect it create user', async () => {
      const createUserPort: CreateUserPort = createPort();

      const mockUser: User = await User.new({
        profile: await Profile.new(),
        id: v4(),
        name: createUserPort.name,
        email: createUserPort.email,
        password: createUserPort.password,
      });

      // CreateUserService에서 사용되는 userRepository 함수들 리턴값 설정
      jest.spyOn(userRepository, 'count').mockResolvedValue(0);
      jest.spyOn(userRepository, 'create').mockResolvedValue(undefined);

      jest.spyOn(userRepository, 'create').mockClear();

      const expectedUserUseCaseDto: UserUseCaseDto = await UserUseCaseDto.newFromUser(mockUser);

      const resultUserUseCaseDto: UserUseCaseDto = await createUserService.execute(createUserPort);
      Reflect.set(resultUserUseCaseDto, 'id', expectedUserUseCaseDto.id);

      expect(resultUserUseCaseDto).toEqual(expectedUserUseCaseDto);
    });

    test('When email already exists, expect it throws Exception', async () => {
      // 이메일이 이미 리포지토리에 존재하는지 확인하는데 사용
      jest.spyOn(userRepository, 'count').mockResolvedValue(1);

      expect.hasAssertions();

      try {
        const createUserPort: CreateUserPort = createPort();
        await createUserService.execute(createUserPort);
      } catch (error) {
        const exception: Exception<ClassValidationDetails> = error;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.ENTITY_ALREADY_EXISTS_ERROR.code);
      }
    });
  });
});
