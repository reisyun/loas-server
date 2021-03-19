import { v4 } from 'uuid';

import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { ClassValidationDetails } from '@core/common/util/ClassValidator';

import { HistoryStatus } from '@core/common/enums/HistoryEnums';
import { MediaStatus } from '@core/common/enums/MediaEnums';
import { History } from '@core/domain/history/entity/History';
import { Media } from '@core/domain/history/value-object/Media';
import { CreateHistoryEntityPayload } from '@core/domain/history/entity/type/CreateHistoryEntityPayload';

async function createHistory(): Promise<History> {
  return History.new({
    media: await Media.new(v4(), MediaStatus.FINISHED),
    ownerId: v4(),
    status: HistoryStatus.PLANNING,
  });
}

describe('History', () => {
  describe('new', () => {
    test('When input optional args are empty, expect it creates History instance with default parameters', async () => {
      const createHistoryEntityPayload: CreateHistoryEntityPayload = {
        media: await Media.new(v4()),
        ownerId: v4(),
        status: HistoryStatus.PLANNING,
      };

      const history: History = await History.new(createHistoryEntityPayload);

      expect(history.getOwnerId).toBe(createHistoryEntityPayload.ownerId);
      expect(history.getStatus).toBe(createHistoryEntityPayload.status);

      expect(typeof history.getId === 'string').toBeTruthy();
      expect(history.getRepeat).toEqual(0);
      expect(history.getSecret).toEqual(false);
    });

    test('When input optional args are set, expect it creates History instance with mock parameters', async () => {
      const mockId: string = v4();
      const mockSecret = true;

      const createHistoryEntityPayload: CreateHistoryEntityPayload = {
        media: await Media.new(v4()),
        ownerId: v4(),
        status: HistoryStatus.PLANNING,
        id: mockId,
        secret: mockSecret,
      };

      const history: History = await History.new(createHistoryEntityPayload);

      expect(history.getId).toBe(mockId);
      expect(history.getSecret).toBe(mockSecret);
    });
  });

  describe('edit', () => {
    test("When input args are empty, expect it doesn't edit History and Media instance", async () => {
      const history = await createHistory();

      await history.edit({});

      // default params
      expect(history.getRepeat).toEqual(0);
      expect(history.getSecret).toEqual(false);
    });

    test('When input args are set, expect it edits History instance', async () => {
      const history: History = await createHistory();

      // edit history
      await history.edit({ secret: true });

      expect(history.getSecret).toEqual(true);
    });
  });

  describe('changeStatus', () => {
    test('When input args are set, expect it changes History status', async () => {
      // history status ==  PLANNING
      const history: History = await createHistory();

      // change status
      await history.changeStatus(HistoryStatus.CURRENT);

      expect(history.getStatus).toBe(HistoryStatus.CURRENT);
    });
  });

  describe('completeStatusRule', () => {
    const historyStatus: HistoryStatus = HistoryStatus.COMPLETED;

    test('When media status is FINISHED, expect it created', async () => {
      const mediaStatus: MediaStatus = MediaStatus.FINISHED;

      const history: History = await History.new({
        media: await Media.new(v4(), mediaStatus),
        status: historyStatus,
        ownerId: v4(),
      });

      expect(history.getCreatedAt).toBeTruthy();
    });

    test('When media status is not FINISHED, expect it throws exception', async () => {
      const mediaStatus: MediaStatus = MediaStatus.RELEASING;

      expect.hasAssertions();

      try {
        await History.new({
          media: await Media.new(v4(), mediaStatus),
          status: historyStatus,
          ownerId: v4(),
        });
      } catch (error) {
        const exception: Exception<ClassValidationDetails> = error;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.BAD_REQUEST_ERROR.code);
      }
    });
  });

  describe('currentStatusRule', () => {
    const historyStatus: HistoryStatus = HistoryStatus.CURRENT;

    test('When media status is FINISHED or RELEASING, expect it created', async () => {
      const mediaStatus: MediaStatus = MediaStatus.FINISHED;

      const history: History = await History.new({
        media: await Media.new(v4(), mediaStatus),
        status: historyStatus,
        ownerId: v4(),
      });

      expect(history.getCreatedAt).toBeTruthy();
    });

    test('When media status is not FINISHED or RELEASING, expect it throws exception', async () => {
      const mediaStatus: MediaStatus = MediaStatus.CANCELLED;

      expect.hasAssertions();

      try {
        await History.new({
          media: await Media.new(v4(), mediaStatus),
          status: historyStatus,
          ownerId: v4(),
        });
      } catch (error) {
        const exception: Exception<ClassValidationDetails> = error;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.BAD_REQUEST_ERROR.code);
      }
    });
  });
});
