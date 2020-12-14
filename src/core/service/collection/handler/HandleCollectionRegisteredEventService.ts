import { Collection, Category } from '@core/domain/collection/entity/Collection';
import { Collector } from '@core/domain/collection/entity/Collector';
import { CollectionRepositoryPort } from '@core/domain/collection/port/persistence/CollectionRepositoryPort';
import { UserCreatedEvent } from '@core/domain/user/handler/event/UserCreatedEvent';
import { CollectionRegisteredEventHandler } from '@core/domain/collection/handler/CollectionRegisteredEventHandler';

export class HandleCollectionRegisteredEventService implements CollectionRegisteredEventHandler {
  private readonly collectionRepository: CollectionRepositoryPort;

  constructor(collectionRepository: CollectionRepositoryPort) {
    this.collectionRepository = collectionRepository;
  }

  public async handle(event: UserCreatedEvent): Promise<void> {
    await this.registerCollection(event, 'CURRENT', Category.CURRENT);
    await this.registerCollection(event, 'PLANNING', Category.PLANNING);
    await this.registerCollection(event, 'COMPLETED', Category.COMPLETED);
  }

  private async registerCollection(event: UserCreatedEvent, name: string, category: Category) {
    const collection: Collection = await Collection.new({
      collector: await Collector.new(event.id, event.name),
      name,
      category,
    });

    await this.collectionRepository.create(collection);
  }
}
