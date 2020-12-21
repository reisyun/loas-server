import { Injectable, Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '@core/domain/user/handler/event/UserCreatedEvent';
import { CollectorRegisteredEventHandler } from '@core/domain/collection/handler/CollectorRegisteredEventHandler';
import { CollectionToken } from '@app/token/CollectionToken';

@Injectable()
@EventsHandler(UserCreatedEvent)
export class NestCollectorRegisteredEventHandler implements IEventHandler {
  private readonly handleService: CollectorRegisteredEventHandler;

  constructor(
    @Inject(CollectionToken.CollectorRegisteredEventHandler)
    handleService: CollectorRegisteredEventHandler,
  ) {
    this.handleService = handleService;
  }

  public async handle(event: UserCreatedEvent): Promise<void> {
    return this.handleService.handle(event);
  }
}
