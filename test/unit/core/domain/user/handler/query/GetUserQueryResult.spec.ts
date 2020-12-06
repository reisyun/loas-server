import { v4 } from 'uuid';
import { GetUserQueryResult } from '@core/domain/user/handler/query/GetUserQueryResult';

describe('GetUserQueryResult', () => {
  describe('new', () => {
    test('Expect it create GetUserQueryResult instance with required parameters', () => {
      const userId: string = v4();
      const userName = 'Name';

      const getUserQueryResult: GetUserQueryResult = GetUserQueryResult.new({
        id: userId,
        name: userName,
      });

      expect(getUserQueryResult.id).toBe(userId);
      expect(getUserQueryResult.name).toBe(userName);
    });
  });
});
