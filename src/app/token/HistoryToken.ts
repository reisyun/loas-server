// prettier-ignore
export class HistoryToken {
  // Use-cases

  public static readonly GetHistoryUseCase: unique symbol = Symbol('GetHistoryUseCase');

  // Handlers

  public static readonly GetHistoryQueryHandler: unique symbol = Symbol('GetHistoryQueryHandler'); 

  public static readonly HistoryRegisteredEventHandler: unique symbol = Symbol('HistoryRegisteredEventHandler'); 

  public static readonly HistoryRemovedEventHandler: unique symbol = Symbol('HistoryRemovedEventHandler'); 

  // Repositories

  public static readonly HistoryRepository: unique symbol = Symbol('HistoryRepository');
}
