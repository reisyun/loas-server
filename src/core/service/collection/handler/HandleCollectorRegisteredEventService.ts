// import { History } from '@core/domain/history/entity/History';
// import { HistoryRepositoryPort } from '@core/domain/history/port/persistence/HistoryRepositoryPort';
// import { UserCreatedEvent } from '@core/domain/user/handler/event/UserCreatedEvent';
// import { HistoryRegisteredEventHandler } from '@core/domain/history/handler/HistoryRegisteredEventHandler';

// export class HandleHistoryRegisteredEventService implements HistoryRegisteredEventHandler {
//   private readonly historyRepository: HistoryRepositoryPort;

//   constructor(historyRepository: HistoryRepositoryPort) {
//     this.historyRepository = historyRepository;
//   }

//   public async handle(event: UserCreatedEvent): Promise<void> {
//     await this.createHistory(event, Category.CURRENT);
//     await this.createHistory(event, Category.PLANNING);
//     await this.createHistory(event, Category.COMPLETED);
//   }

//   private async createHistory(event: UserCreatedEvent, category: Category): Promise<void> {
//     const history: History = await History.new({
//       collector: await History.new(event.id, event.name),
//       category,
//     });

//     await this.historyRepository.create(history);
//   }
// }
