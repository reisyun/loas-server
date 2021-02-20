import { UseCase } from '@core/common/UseCase';
import { GetHistoryListPort } from '@core/domain/history/port/usecase/GetHistoryListPort';
import { HistoryUseCaseDto } from '@core/domain/history/usecase/dto/HistoryUseCaseDto';

/**
 * Get history list use case
 *
 * - 입력 받은 식별자로 기록을 찾는다.
 * - 제거된 기록은 가져오기에서 제외한다.
 * - 다른 유저의 기록은 비밀이면 필터한다.
 */
export interface GetHistoryListUseCase extends UseCase<GetHistoryListPort, HistoryUseCaseDto[]> {}
