import { User, UserRole } from '@core/domain/user/entity/User';
import { CreateUserEntityPayload } from '@core/domain/user/entity/type/CreateUserEntityPayload';
import { v4 } from 'uuid';

const mockUserData = (): CreateUserEntityPayload => ({
  name: 'Name',
  email: 'user@test.io',
  password: '12345678',
  verified: false,
  role: UserRole.USER,
});

describe('User', () => {
  describe('new', () => {
    test('When input optional args are empty, expect it creates User instance with default parameters', async () => {
      const createUserEntityPayload: CreateUserEntityPayload = mockUserData();
      const currentDate: number = Date.now();

      const user: User = await User.new(createUserEntityPayload);
      expect(user.getName).toBe(createUserEntityPayload.name);
      expect(user.getEmail).toBe(createUserEntityPayload.email);
      expect(user.getPassword).not.toBe(createUserEntityPayload.password);
      expect(user.getVerified).toBe(createUserEntityPayload.verified);
      expect(user.getRole).toBe(createUserEntityPayload.role);

      expect(typeof user.getId === 'string').toBeTruthy();
      expect(user.getCreatedAt.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
      expect(user.getUpdatedAt.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
      expect(user.getRemovedAt).toBeNull();
    });

    test('When input optional args are set, expect it creates User instance with mock parameters', async () => {
      const createUserEntityPayload: CreateUserEntityPayload = mockUserData();
      const mockId: string = v4();
      const mockCreatedAt: Date = new Date(Date.now() - 3000);
      const mockUpdatedAt: Date = new Date(Date.now() - 2000);
      const mockRemovedAt: Date = new Date(Date.now() - 1000);

      const user: User = await User.new({
        ...createUserEntityPayload,
        id: mockId,
        createdAt: mockCreatedAt,
        updatedAt: mockUpdatedAt,
        removedAt: mockRemovedAt,
      });

      expect(user.getName).toBe(createUserEntityPayload.name);
      expect(user.getEmail).toBe(createUserEntityPayload.email);
      expect(user.getPassword).not.toBe(createUserEntityPayload.password);
      expect(user.getVerified).toBe(createUserEntityPayload.verified);
      expect(user.getRole).toBe(createUserEntityPayload.role);

      expect(user.getId).toBe(mockId);
      expect(user.getCreatedAt).toBe(mockCreatedAt);
      expect(user.getUpdatedAt).toBe(mockUpdatedAt);
      expect(user.getRemovedAt).toBe(mockRemovedAt);
    });
  });

  describe('edit', () => {
    test('When input args are set, expect it edits User instance', async () => {
      const createUserEntityPayload: CreateUserEntityPayload = mockUserData();
      const currentDate: number = Date.now();

      const user: User = await User.new(createUserEntityPayload);

      await user.edit({ name: 'New Name' });

      expect(user.getName).toBe('New Name');
      expect(user.getUpdatedAt?.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
    });
  });

  describe('remove', () => {
    test('Expect it marks User instance as removed', async () => {
      const createUserEntityPayload: CreateUserEntityPayload = mockUserData();
      const currentDate: number = Date.now();

      const user: User = await User.new(createUserEntityPayload);

      await user.remove();

      expect(user.getRemovedAt?.getTime()).toBeGreaterThanOrEqual(currentDate - 5000);
    });
  });

  describe('comparePassword', () => {
    test('When password is correct, expect it returns TRUE', async () => {
      const createUserEntityPayload: CreateUserEntityPayload = mockUserData();
      const password = 'abcd';

      const user: User = await User.new({
        ...createUserEntityPayload,
        password,
      });

      await expect(user.comparePassword(password)).resolves.toBeTruthy();
    });

    test('When password is not correct, expect it returns FALSE', async () => {
      const createUserEntityPayload: CreateUserEntityPayload = mockUserData();
      const password = '1234';
      const incorrectPassword = `4321`;

      const user: User = await User.new({
        ...createUserEntityPayload,
        password,
      });

      await expect(user.comparePassword(incorrectPassword)).resolves.toBeFalsy();
    });
  });
});
