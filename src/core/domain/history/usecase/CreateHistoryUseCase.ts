import { UseCase } from '@core/common/UseCase';
import { CreateHistoryPort } from '@core/domain/history/port/usecase/CreateHistoryPort';
import { HistoryUseCaseDto } from '@core/domain/history/usecase/dto/HistoryUseCaseDto';

/**
 * Create history use case
 *
 * - 기록에 미디어가 이미 존재하는지 확인한다.
 * - 만약 미디어가 이미 존재하면 입력받은 양식으로 업데이트 한다.
 * - 만약 미디어가 존재하지 않으면 기록을 새롭게 만든다.
 */
export interface CreateHistoryUseCase extends UseCase<CreateHistoryPort, HistoryUseCaseDto> {}
