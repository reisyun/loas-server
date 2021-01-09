import { UseCase } from '@core/common/UseCase';
import { AddHistoryItemPort } from '@core/domain/historyItem/port/usecase/AddHistoryItemPort';
import { HistoryItemUseCaseDto } from '@core/domain/historyItem/usecase/dto/HistoryItemUseCaseDto';

/**
 * Add history item use case
 *
 * - `COMPLETED` 카테고리는 `FINISHED` 상태인 미디어만 추가할 수 있다.
 *    기본적으로 감상완료 날짜는 현재 날짜이다.
 *    만약 이미 목록에 같은 미디어가 존재한다면 재시청을 1 올린다.
 *
 * - `CURRENT` 카테고리는 `FINISHED`, `RELEASING` 상태인 미디어만 추가할 수 있다.
 *    만약 이미 목록에 같은 미디어가 존재한다면 갱신한다.
 *
 * - `PLANNING` 카테고리는 모든 상태의 미디어를 추가할 수 있다.
 *    만약 이미 목록에 같은 미디어가 존재한다면 갱신한다.
 */
export interface AddHistoryItemUseCase extends UseCase<AddHistoryItemPort, HistoryItemUseCaseDto> {}
