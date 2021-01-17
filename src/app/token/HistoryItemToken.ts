// prettier-ignore
export class HistoryItemToken {
  // Use-cases

  public static readonly AddHistoryItemUseCase: unique symbol = Symbol('AddHistoryItemUseCase');

  public static readonly RemoveHistoryItemUseCase: unique symbol = Symbol('RemoveHistoryItemUseCase');

  // Repositories

  public static readonly HistoryItemRepository: unique symbol = Symbol('HistoryItemRepository');
}
