import { Collection, Category } from '@core/domain/collection/entity/Collection';
import { Collector } from '@core/domain/collection/value-object/Collector';
import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { UserCreatedEvent } from '@core/domain/user/handler/event/UserCreatedEvent';
import { CollectorRegisteredEventHandler } from '@core/domain/collection/handler/CollectorRegisteredEventHandler';

export class HandleCollectorRegisteredEventService implements CollectorRegisteredEventHandler {
  private readonly collectionRepository: CollectionRepositoryPort;

  constructor(collectionRepository: CollectionRepositoryPort) {
    this.collectionRepository = collectionRepository;
  }

  public async handle(event: UserCreatedEvent): Promise<void> {
    await this.createCollection(event, 'CURRENT', Category.CURRENT);
    await this.createCollection(event, 'PLANNING', Category.PLANNING);
    await this.createCollection(event, 'COMPLETED', Category.COMPLETED);
  }

  private async createCollection(
    event: UserCreatedEvent,
    name: string,
    category: Category,
  ): Promise<void> {
    const collection: Collection = await Collection.new({
      collector: await Collector.new(event.id, event.name),
      name,
      category,
    });

    await this.collectionRepository.create(collection);
  }
}
