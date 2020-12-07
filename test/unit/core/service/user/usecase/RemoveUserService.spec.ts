import { v4 } from 'uuid';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { ClassValidationDetails } from '@core/common/util/ClassValidator';
import { QueryBusPort } from '@core/common/message/query/QueryBusPort';
import { GetCollectionsQueryResult } from '@core/domain/collection/handler/query/GetCollectionsQueryResult';
import { User } from '@core/domain/user/entity/User';
import { Profile } from '@core/domain/user/value-object/Profile';
import { Category } from '@core/domain/collection/entity/Collection';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { RemoveUserPort } from '@core/domain/user/port/usecase/RemoveUserPort';
import { RemoveUserUseCase } from '@core/domain/user/usecase/RemoveUserUseCase';
import { RemoveUserService } from '@core/service/user/usecase/RemoveUserService';
import { CoreToken } from '@app/token/CoreToken';
import { UserToken } from '@app/token/UserToken';
import { NestQueryBusAdapter } from '@infra/adapter/common/message/NestQueryBusAdapter';
import { UserRepositoryAdapter } from '@infra/adapter/user/persistence/UserRepositoryAdapter';

async function createUser(): Promise<User> {
  return User.new({
    profile: await Profile.new(),
    name: 'Name',
    email: 'user@test.io',
    password: '12345678',
  });
}

function createCollction(): GetCollectionsQueryResult[] {
  const id: string = v4();
  const category: Category = Category.CUSTOM;

  return [GetCollectionsQueryResult.new({ id, category })];
}

describe('RemoveUserService', () => {
  let removeUserService: RemoveUserUseCase;
  let userRepository: UserRepositoryPort;
  let queryBus: QueryBusPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: UserToken.RemoveUserUseCase,
          useFactory: (userRepository, queryBus) => new RemoveUserService(userRepository, queryBus),
          inject: [UserToken.UserRepository, CoreToken.QueryBus],
        },
        {
          provide: UserToken.UserRepository,
          useClass: UserRepositoryAdapter,
        },
        {
          provide: CoreToken.QueryBus,
          useClass: NestQueryBusAdapter,
        },
      ],
    }).compile();

    removeUserService = module.get<RemoveUserUseCase>(UserToken.RemoveUserUseCase);
    userRepository = module.get<UserRepositoryPort>(UserToken.UserRepository);
    queryBus = module.get<QueryBusPort>(CoreToken.QueryBus);
  });

  describe('execute', () => {
    test('Expect it remove user', async () => {
      const mockUser: User = await createUser();
      const mockCollection: GetCollectionsQueryResult[] = createCollction();

      jest.spyOn(queryBus, 'sendQuery').mockResolvedValue(mockCollection);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(userRepository, 'remove').mockResolvedValue(undefined);

      jest.spyOn(userRepository, 'remove').mockClear();

      expect.assertions(0);

      try {
        const removeUserPort: RemoveUserPort = {
          userId: mockUser.getId,
          confirm: true,
        };
        await removeUserService.execute(removeUserPort);
      } catch (error) {
        expect(error).toThrowError();
      }
    });

    test('When user not found, expect it throws Exception', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      expect.hasAssertions();

      try {
        const removeUserPort: RemoveUserPort = { userId: v4(), confirm: true };
        await removeUserService.execute(removeUserPort);
      } catch (error) {
        const exception: Exception<ClassValidationDetails> = error;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.ENTITY_NOT_FOUND_ERROR.code);
      }
    });

    test('When user is found but declined to confirm, expect it throw Exception', async () => {
      const mockUser: User = await createUser();

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

      expect.hasAssertions();

      try {
        const removeUserPort: RemoveUserPort = { userId: v4(), confirm: false };
        await removeUserService.execute(removeUserPort);
      } catch (error) {
        const exception: Exception<ClassValidationDetails> = error;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.ACCESS_DENIED_ERROR.code);
      }
    });
  });
});
