// prettier-ignore
export class HistoryToken {
  // Use-cases

  public static readonly CreateHistoryUseCase: unique symbol = Symbol('CreateHistoryUseCase');

  public static readonly ChangeHistoryStatusUseCase: unique symbol = Symbol('ChangeHistoryStatusUseCase');
  
  // Repositories

  public static readonly HistoryRepository: unique symbol = Symbol('HistoryRepository');
}
