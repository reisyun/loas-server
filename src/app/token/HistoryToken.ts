// prettier-ignore
export class HistoryToken {
  // Use-cases

  // Handlers

  public static readonly HistoryRegisteredEventHandler: unique symbol = Symbol('HistoryRegisteredEventHandler'); 

  // Repositories

  public static readonly HistoryRepository: unique symbol = Symbol('HistoryRepository');
}
