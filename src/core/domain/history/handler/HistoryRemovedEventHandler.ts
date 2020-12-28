import { EventHandler } from '@core/common/message/handler/EventHandler';
import { UserDeletedEvent } from '@core/domain/user/handler/event/UserDeletedEvent';

/**
 * Remove all history when the user is deleted
 */
export interface HistoryRemovedEventHandler extends EventHandler<UserDeletedEvent> {}
