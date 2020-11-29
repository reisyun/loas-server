/**
 * UseCase process
 *
 *  InputValues -> UseCase -> OutputValues
 */
export interface UseCase<TUseCasePort, TUseCaseResult> {
  execute(port?: TUseCasePort): Promise<TUseCaseResult>;
}
