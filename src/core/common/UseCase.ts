/**
 * UseCase 실행 순서
 * 1. Port에 알맞은 데이터를 받아옴
 * 2. 내부 로직을 수행
 * 3. DTO에 알맞은 데이터를 내보냄
 */
export interface UseCase<TUseCasePort, TUseCaseResult> {
  execute(port?: TUseCasePort): Promise<TUseCaseResult>;
}
