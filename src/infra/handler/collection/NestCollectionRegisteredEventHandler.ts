import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { UserCreatedEvent } from '@core/domain/user/handler/event/UserCreatedEvent';
import { CollectionRegisteredEventHandler } from '@core/domain/collection/handler/CollectionRegisteredEventHandler';
import { CollectionToken } from '@app/token/CollectionToken';

@Injectable()
@EventsHandler(UserCreatedEvent)
export class NestCollectionRegisteredEventHandler implements IEventHandler {
  private readonly handleService: CollectionRegisteredEventHandler;

  constructor(
    @Inject(CollectionToken.CollectionRegisteredEventHandler)
    handleService: CollectionRegisteredEventHandler,
  ) {
    this.handleService = handleService;
  }

  public async handle(event: UserCreatedEvent): Promise<void> {
    return this.handleService.handle(event);
  }
}
