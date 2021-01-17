import { UseCase } from '@core/common/UseCase';
import { GetHistoryPort } from '@core/domain/history/port/usecase/GetHistoryPort';
import { HistoryUseCaseDto } from '@core/domain/history/usecase/dto/HistoryUseCaseDto';

/**
 * Add history item use case
 *
 * - 기록의 카테고리는 Completed, Current, Planinng 3가지가 있다.
 * - 사용자의 식별자와 카테고리로 기록을 찾는다.
 * - 기록의 소유자만 조회 할 권한이 있다.
 */
export interface GetHistoryUseCase extends UseCase<GetHistoryPort, HistoryUseCaseDto> {}
