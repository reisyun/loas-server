import { UseCase } from '@core/common/UseCase';
import { EditHistoryPort } from '@core/domain/history/port/usecase/EditHistoryPort';
import { HistoryUseCaseDto } from '@core/domain/history/usecase/dto/HistoryUseCaseDto';

/**
 * Edit history use case
 *
 * - 기록을 수정할 권한이 있는지 확인한다.
 * - 수정한게 없다면 이전과 동일해야 한다.
 */
export interface EditHistoryUseCase extends UseCase<EditHistoryPort, HistoryUseCaseDto> {}
