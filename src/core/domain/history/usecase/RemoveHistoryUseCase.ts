import { UseCase } from '@core/common/UseCase';
import { RemoveHistoryPort } from '@core/domain/history/port/usecase/RemoveHistoryPort';

/**
 * Remove history use case
 *
 * - 입력 받은 식별자로 기록을 찾는다.
 * - 기록을 제거할 권한이 있는지 확인한다.
 */
export interface RemoveHistoryUseCase extends UseCase<RemoveHistoryPort, void> {}
