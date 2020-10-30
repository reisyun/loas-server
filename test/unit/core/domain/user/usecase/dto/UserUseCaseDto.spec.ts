import { User, UserRole } from '@core/domain/user/entity/User';
import { CreateUserEntityPayload } from '@core/domain/user/entity/type/CreateUserEntityPayload';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

const mockUserData = (): CreateUserEntityPayload => ({
  name: 'Name',
  email: 'user@example.com',
  password: '1324',
  verified: false,
  role: UserRole.USER,
});

async function createUser(): Promise<User> {
  const createUserEntityPayload: CreateUserEntityPayload = mockUserData();
  return User.new(createUserEntityPayload);
}

describe('UserUseCaseDto', () => {
  describe('newFromUser', () => {
    test('Expect it creates UserUseCaseDto instance with required parameters', async () => {
      const user: User = await createUser();
      const userUseCaseDto: UserUseCaseDto = UserUseCaseDto.newFromUser(user);

      expect(userUseCaseDto.id).toBe(user.getId);
      expect(userUseCaseDto.name).toBe(user.getName);
      expect(userUseCaseDto.email).toBe(user.getEmail);
    });
  });

  describe('newListFromUsers', () => {
    test('Expect it creates UserUseCaseDto instances with required parameters', async () => {
      const user: User = await createUser();
      const userUseCaseDtos: UserUseCaseDto[] = UserUseCaseDto.newListFromUsers([user]);

      expect(userUseCaseDtos.length).toBe(1);
      expect(userUseCaseDtos[0].id).toBe(user.getId);
      expect(userUseCaseDtos[0].name).toBe(user.getName);
      expect(userUseCaseDtos[0].email).toBe(user.getEmail);
    });
  });
});
