import { v4 } from 'uuid';
import { HistoryStatus } from '@core/common/enums/HistoryEnums';
import { MediaStatus } from '@core/common/enums/MediaEnums';
import { History } from '@core/domain/history/entity/History';
import { Media } from '@core/domain/history/value-object/Media';
import { HistoryUseCaseDto } from '@core/domain/history/usecase/dto/HistoryUseCaseDto';

async function createHistory(): Promise<History> {
  return History.new({
    media: await Media.new(v4(), MediaStatus.FINISHED),
    status: HistoryStatus.COMPLETED,
    ownerId: v4(),
  });
}

describe('HistoryUseCaseDto', () => {
  let history: History;
  let expectedMedia: Record<string, unknown>;

  beforeEach(async () => {
    history = await createHistory();

    expectedMedia = {
      id: history.getMedia.getId,
      status: history.getMedia.getStatus,
    };
  });

  describe('newFromHistory', () => {
    test('Expect it creates HistoryUseCaseDto instance with required parameters', async () => {
      const historyUseCaseDto: HistoryUseCaseDto = HistoryUseCaseDto.newFromHistory(history);

      expect(historyUseCaseDto.id).toBe(history.getId);
      expect(historyUseCaseDto.status).toBe(history.getStatus);
      expect(historyUseCaseDto.ownerId).toBe(history.getOwnerId);
      expect(historyUseCaseDto.mediaId).toEqual(expectedMedia.id);
    });
  });

  describe('newListFromHistories', () => {
    test('Expect it creates HistoryUseCaseDto instances with required parameters', async () => {
      const historyUseCaseDtos: HistoryUseCaseDto[] = HistoryUseCaseDto.newListFromHistories([
        history,
      ]);

      expect(historyUseCaseDtos.length).toBe(1);
      expect(historyUseCaseDtos[0].id).toBe(history.getId);
      expect(historyUseCaseDtos[0].status).toBe(history.getStatus);
      expect(historyUseCaseDtos[0].ownerId).toBe(history.getOwnerId);
      expect(historyUseCaseDtos[0].mediaId).toBe(history.getMedia.getId);
    });
  });
});
