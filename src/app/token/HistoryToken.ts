// prettier-ignore
export class HistoryToken {
  // Use-cases

  public static readonly CreateHistoryUseCase: unique symbol = Symbol('CreateHistoryUseCase');
  
  // Repositories

  public static readonly HistoryRepository: unique symbol = Symbol('HistoryRepository');
}
