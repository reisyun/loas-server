import { UseCase } from '@core/common/UseCase';
import { ChangeHistoryStatusPort } from '@core/domain/history/port/usecase/ChangeHistoryStatusPort';
import { HistoryUseCaseDto } from '@core/domain/history/usecase/dto/HistoryUseCaseDto';

/**
 * Change history status use case
 *
 * - 기록을 수정할 권한이 있는지 확인한다.
 * - 변경한게 없다면 이전의 상태와 동일해야 한다.
 */
export interface ChangeHistoryStatusUseCase
  extends UseCase<ChangeHistoryStatusPort, HistoryUseCaseDto> {}
