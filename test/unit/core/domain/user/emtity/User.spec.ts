import { v4 } from 'uuid';
import { User, UserRole } from '@core/domain/user/entity/User';
import { Profile, Gender, Language } from '@core/domain/user/value-object/Profile';
import { CreateUserEntityPayload } from '@core/domain/user/entity/type/CreateUserEntityPayload';

async function createUser(): Promise<User> {
  return User.new({
    profile: await Profile.new(),
    name: 'Name',
    email: 'user@test.io',
    password: '12345678',
  });
}

describe('User', () => {
  describe('new', () => {
    test('When input optional args are empty, expect it creates User instance with default parameters', async () => {
      const currentDate: number = Date.now();

      const createUserEntityPayload: CreateUserEntityPayload = {
        profile: await Profile.new(),
        name: 'Name',
        email: 'user@test.io',
        password: '12345678',
      };

      const user: User = await User.new(createUserEntityPayload);

      const expectedProfile: Record<string, unknown> = {
        shortBio: null,
        avatar: null,
        gender: Gender.SECRET,
        language: Language.KOREAN,
      };

      expect(user.getProfile).toEqual(expectedProfile);
      expect(user.getName).toBe(createUserEntityPayload.name);
      expect(user.getEmail).toBe(createUserEntityPayload.email);
      expect(user.getPassword).not.toBe(createUserEntityPayload.password);
      expect(user.getVerified).toBe(false);
      expect(user.getRole).toBe(UserRole.USER);

      expect(typeof user.getId === 'string').toBeTruthy();
      expect(user.getCreatedAt.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
      expect(user.getUpdatedAt.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
    });

    test('When input optional args are set, expect it creates User instance with mock parameters', async () => {
      const mockId: string = v4();
      const mockVerified = true;
      const mockCreatedAt: Date = new Date(Date.now() - 2000);
      const mockUpdatedAt: Date = new Date(Date.now() - 1000);

      const createUserEntityPayload: CreateUserEntityPayload = {
        profile: await Profile.new(),
        name: 'Name',
        email: 'user@test.io',
        password: '12345678',
        id: mockId,
        verified: mockVerified,
        createdAt: mockCreatedAt,
        updatedAt: mockUpdatedAt,
      };

      const user: User = await User.new(createUserEntityPayload);

      expect(user.getId).toBe(mockId);
      expect(user.getVerified).toBe(mockVerified);
      expect(user.getCreatedAt).toBe(mockCreatedAt);
      expect(user.getUpdatedAt).toBe(mockUpdatedAt);
    });
  });

  describe('edit', () => {
    test("When input args are empty, expect it doesn't edit User and Profile instance", async () => {
      const createdDate: number = Date.now();

      const user = await User.new({
        profile: await Profile.new(),
        name: 'Name',
        email: 'user@test.io',
        password: v4(),
      });

      const expectedProfile: Record<string, unknown> = {
        shortBio: null,
        avatar: null,
        gender: Gender.SECRET,
        language: Language.KOREAN,
      };

      await user.edit({});
      await user.editProfile({});

      expect(user.getName).toEqual('Name');
      expect(user.getProfile).toEqual(expectedProfile);
      expect(user.getUpdatedAt?.getTime()).toBeGreaterThanOrEqual(createdDate - 5000);
    });

    test('When input args are set, expect it edits User instance', async () => {
      const currentDate: number = Date.now();

      const user: User = await createUser();

      await user.edit({ name: 'New name' });

      expect(user.getName).toBe('New name');
      expect(user.getUpdatedAt?.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
    });

    test('When input args are set, expect it edits Profile instance in User', async () => {
      const currentDate: number = Date.now();

      const user: User = await createUser();

      await user.editProfile({
        shortBio: 'hello',
        language: Language.JAPANESE,
      });

      expect(user.getProfile.getShortBio).toBe('hello');
      expect(user.getProfile.getLanguage).toBe(Language.JAPANESE);
      expect(user.getUpdatedAt?.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
    });
  });

  describe('comparePassword', () => {
    test('When password is correct, expect it returns TRUE', async () => {
      const password = 'abcd';

      const user: User = await User.new({
        profile: await Profile.new(),
        name: 'Name',
        email: 'user@test.io',
        password,
      });

      await expect(user.comparePassword(password)).resolves.toBeTruthy();
    });

    test('When password is not correct, expect it returns FALSE', async () => {
      const password = '1234';
      const incorrectPassword = `4321`;

      const user: User = await User.new({
        profile: await Profile.new(),
        name: 'Name',
        email: 'user@test.io',
        password,
      });

      await expect(user.comparePassword(incorrectPassword)).resolves.toBeFalsy();
    });
  });
});
