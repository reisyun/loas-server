import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EventBusPort } from '@core/common/message/port/EventBusPort';

@Injectable()
export class NestEventBusAdapter implements EventBusPort {
  private readonly eventBus: EventBus;

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
  }

  public async sendEvent<TEvent>(event: TEvent): Promise<void> {
    return this.eventBus.publish(event);
  }
}
