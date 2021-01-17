import { UseCase } from '@core/common/UseCase';
import { RemoveHistoryItemPort } from '@core/domain/historyItem/port/usecase/RemoveHistoryItemPort';

/**
 * Remove history item use case
 *
 */
export interface RemoveHistoryItemUseCase extends UseCase<RemoveHistoryItemPort, void> {}
