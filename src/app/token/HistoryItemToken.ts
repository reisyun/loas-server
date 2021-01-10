// prettier-ignore
export class HistoryItemToken {
  // Use-cases

  public static readonly AddHistoryItemUseCase: unique symbol = Symbol('AddHistoryItemUseCase');

  // Repositories

  public static readonly HistoryItemRepository: unique symbol = Symbol('HistoryItemRepository');
}
