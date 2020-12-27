import { EventHandler } from '@core/common/message/handler/EventHandler';
import { UserCreatedEvent } from '@core/domain/user/handler/event/UserCreatedEvent';

/**
 * Register required histies when created a user
 */
export interface HistoryRegisteredEventHandler extends EventHandler<UserCreatedEvent> {}
