import { Injectable, Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserDeletedEvent } from '@core/domain/user/handler/event/UserDeletedEvent';
import { HistoryRemovedEventHandler } from '@core/domain/history/handler/HistoryRemovedEventHandler';
import { HistoryToken } from '@app/token/HistoryToken';

@Injectable()
@EventsHandler(UserDeletedEvent)
export class NestHistoryRemovedEventHandler implements IEventHandler {
  private readonly handleService: HistoryRemovedEventHandler;

  constructor(
    @Inject(HistoryToken.HistoryRemovedEventHandler)
    handleService: HistoryRemovedEventHandler,
  ) {
    this.handleService = handleService;
  }

  public async handle(event: UserDeletedEvent): Promise<void> {
    return this.handleService.handle(event);
  }
}
