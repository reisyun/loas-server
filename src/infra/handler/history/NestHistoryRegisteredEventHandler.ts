import { Injectable, Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '@core/domain/user/handler/event/UserCreatedEvent';
import { HistoryRegisteredEventHandler } from '@core/domain/history/handler/HistoryRegisteredEventHandler';
import { HistoryToken } from '@app/token/HistoryToken';

@Injectable()
@EventsHandler(UserCreatedEvent)
export class NestHistoryRegisteredEventHandler implements IEventHandler {
  private readonly handleService: HistoryRegisteredEventHandler;

  constructor(
    @Inject(HistoryToken.HistoryRegisteredEventHandler)
    handleService: HistoryRegisteredEventHandler,
  ) {
    this.handleService = handleService;
  }

  public async handle(event: UserCreatedEvent): Promise<void> {
    return this.handleService.handle(event);
  }
}
