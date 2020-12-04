import { User } from '@core/domain/user/entity/User';
import { Profile } from '@core/domain/user/entity/Profile';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

async function createUser(): Promise<User> {
  return User.new({
    profile: new Profile(0),
    name: 'Name',
    email: 'user@test.io',
    password: '12345678',
    verified: false,
  });
}

describe('UserUseCaseDto', () => {
  describe('newFromUser', () => {
    test('Expect it creates UserUseCaseDto instance with required parameters', async () => {
      const user: User = await createUser();
      const userUseCaseDto: UserUseCaseDto = UserUseCaseDto.newFromUser(user);

      const expectedProfile: Record<string, unknown> = {
        id: user.getProfile.getId,
        shortBio: user.getProfile.getShortBio,
        avatar: user.getProfile.getAvatar,
        gender: user.getProfile.getGender,
        language: user.getProfile.getLanguage,
      };

      expect(userUseCaseDto.id).toBe(user.getId);
      expect(userUseCaseDto.name).toBe(user.getName);
      expect(userUseCaseDto.email).toBe(user.getEmail);
      expect(userUseCaseDto.profile).toEqual(expectedProfile);
    });
  });

  describe('newListFromUsers', () => {
    test('Expect it creates UserUseCaseDto instances with required parameters', async () => {
      const user: User = await createUser();
      const userUseCaseDtos: UserUseCaseDto[] = UserUseCaseDto.newListFromUsers([user]);

      const expectedProfile: Record<string, unknown> = {
        id: user.getProfile.getId,
        shortBio: user.getProfile.getShortBio,
        avatar: user.getProfile.getAvatar,
        gender: user.getProfile.getGender,
        language: user.getProfile.getLanguage,
      };

      expect(userUseCaseDtos.length).toBe(1);
      expect(userUseCaseDtos[0].id).toBe(user.getId);
      expect(userUseCaseDtos[0].name).toBe(user.getName);
      expect(userUseCaseDtos[0].email).toBe(user.getEmail);
      expect(userUseCaseDtos[0].profile).toEqual(expectedProfile);
    });
  });
});
