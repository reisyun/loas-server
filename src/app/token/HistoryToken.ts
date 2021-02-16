// prettier-ignore
export class HistoryToken {
  // Use-cases

  public static readonly GetHistoryUseCase: unique symbol = Symbol('GetHistoryUseCase');

  public static readonly GetHistoryListUseCase: unique symbol = Symbol('GetHistoryListUseCase');

  public static readonly CreateHistoryUseCase: unique symbol = Symbol('CreateHistoryUseCase');

  public static readonly EditHistoryUseCase: unique symbol = Symbol('EditHistoryUseCase');

  public static readonly ChangeHistoryStatusUseCase: unique symbol = Symbol('ChangeHistoryStatusUseCase');
  
  // Repositories

  public static readonly HistoryRepository: unique symbol = Symbol('HistoryRepository');
}
