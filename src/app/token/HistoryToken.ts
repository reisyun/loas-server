// prettier-ignore
export class HistoryToken {
  // Use-cases

  public static readonly AddHistoryItemUseCase: unique symbol = Symbol('AddHistoryItemUseCase');

  // Handlers

  public static readonly HistoryRegisteredEventHandler: unique symbol = Symbol('HistoryRegisteredEventHandler'); 

  public static readonly HistoryRemovedEventHandler: unique symbol = Symbol('HistoryRemovedEventHandler'); 

  // Repositories

  public static readonly HistoryRepository: unique symbol = Symbol('HistoryRepository');
}
