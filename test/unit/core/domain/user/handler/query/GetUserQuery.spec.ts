import { v4 } from 'uuid';
import { GetUserQuery } from '@core/domain/user/handler/query/GetUserQuery';

describe('GetUserQuery', () => {
  describe('new', () => {
    test('Expect it create GetUserQuery instance with required parameters', () => {
      const where: { id: string } = { id: v4() };

      const getUserQuery: GetUserQuery = GetUserQuery.new(where);

      expect(getUserQuery.where).toEqual(where);
    });
  });
});
