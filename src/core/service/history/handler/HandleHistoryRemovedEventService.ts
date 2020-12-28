import { History } from '@core/domain/history/entity/History';
import { HistoryRepositoryPort } from '@core/domain/history/port/persistence/HistoryRepositoryPort';
import { UserDeletedEvent } from '@core/domain/user/handler/event/UserDeletedEvent';
import { HistoryRemovedEventHandler } from '@core/domain/history/handler/HistoryRemovedEventHandler';

export class HandleHistoryRemovedEventService implements HistoryRemovedEventHandler {
  private readonly historyRepository: HistoryRepositoryPort;

  constructor(historyRepository: HistoryRepositoryPort) {
    this.historyRepository = historyRepository;
  }

  public async handle(event: UserDeletedEvent): Promise<void> {
    const histories: History[] = await this.historyRepository.findMany({
      where: { ownerId: event.id },
    });

    histories.map(async (history: History) => {
      await history.remove();
      await this.historyRepository.remove(history);
    });
  }
}
