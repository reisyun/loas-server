import { UseCase } from '@core/common/UseCase';
import { GetHistoryPort } from '@core/domain/history/port/usecase/GetHistoryPort';
import { HistoryUseCaseDto } from '@core/domain/history/usecase/dto/HistoryUseCaseDto';

/**
 * Get history use case
 *
 * - 입력 받은 식별자로 기록을 찾는다.
 * - 기록의 소유자만 조회 할 권한이 있다.
 */
export interface GetHistoryUseCase extends UseCase<GetHistoryPort, HistoryUseCaseDto> {}
