import { EventHandler } from '@core/common/message/event/EventHandler';
import { UserCreatedEvent } from '@core/domain/user/handler/event/UserCreatedEvent';

/**
 * Register required collections when created a user
 */
export interface CollectionRegisteredEventHandler extends EventHandler<UserCreatedEvent> {}
