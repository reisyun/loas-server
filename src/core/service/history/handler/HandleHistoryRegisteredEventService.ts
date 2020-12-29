import { History, HistoryCategory } from '@core/domain/history/entity/History';
import { HistoryRepositoryPort } from '@core/domain/history/port/persistence/HistoryRepositoryPort';
import { UserCreatedEvent } from '@core/domain/user/handler/event/UserCreatedEvent';
import { HistoryRegisteredEventHandler } from '@core/domain/history/handler/HistoryRegisteredEventHandler';
import { HistoryOwner } from '@core/domain/history/value-object/HistoryOwner';

export class HandleHistoryRegisteredEventService implements HistoryRegisteredEventHandler {
  private readonly historyRepository: HistoryRepositoryPort;

  constructor(historyRepository: HistoryRepositoryPort) {
    this.historyRepository = historyRepository;
  }

  public async handle(event: UserCreatedEvent): Promise<void> {
    await this.registerHistory(event, HistoryCategory.COMPLETED);
    await this.registerHistory(event, HistoryCategory.PLANNING);
    await this.registerHistory(event, HistoryCategory.CURRENT);
  }

  private async registerHistory(event: UserCreatedEvent, category: HistoryCategory): Promise<void> {
    const history: History = await History.new({
      owner: await HistoryOwner.new(event.id, event.name),
      category,
    });

    await this.historyRepository.create(history);
  }
}
