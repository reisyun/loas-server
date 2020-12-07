import { v4 } from 'uuid';
import { Nullable } from '@core/common/Types';
import { Test, TestingModule } from '@nestjs/testing';
import { GetUserQuery } from '@core/domain/user/handler/query/GetUserQuery';
import { GetUserQueryResult } from '@core/domain/user/handler/query/GetUserQueryResult';
import { User } from '@core/domain/user/entity/User';
import { Profile } from '@core/domain/user/value-object/Profile';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { GetUserQueryHandler } from '@core/domain/user/handler/GetUserQueryHandler';
import { HandleGetUserQueryService } from '@core/service/user/handler/HandleGetUserQueryService';
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

describe('HandleGetUserQueryService', () => {
  let getUserQueryHandler: GetUserQueryHandler;
  let userRepository: UserRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserToken.GetUserQueryHandler,
          useFactory: userRepository => new HandleGetUserQueryService(userRepository),
          inject: [UserToken.UserRepository],
        },
        {
          provide: UserToken.UserRepository,
          useClass: UserRepositoryAdapter,
        },
      ],
    }).compile();

    getUserQueryHandler = module.get<GetUserQueryHandler>(UserToken.GetUserQueryHandler);
    userRepository = module.get<UserRepositoryPort>(UserToken.UserRepository);
  });

  describe('handle', () => {
    test('When user found, expect it return user preview', async () => {
      const mockUser: User = await createUser();

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

      const expected: GetUserQueryResult = GetUserQueryResult.new({
        id: mockUser.getId,
        name: mockUser.getName,
      });

      const getUserQuery: GetUserQuery = GetUserQuery.new({ id: mockUser.getId });
      const result: Nullable<GetUserQueryResult> = await getUserQueryHandler.handle(getUserQuery);

      expect(result).toEqual(expected);
    });

    test('When user not found, expect it return null', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      const getUserQuery: GetUserQuery = GetUserQuery.new({ id: v4() });
      const result: Nullable<GetUserQueryResult> = await getUserQueryHandler.handle(getUserQuery);

      expect(result).toBeNull();
    });
  });
});
