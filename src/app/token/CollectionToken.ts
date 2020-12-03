// prettier-ignore
export class CollectionToken {
  // Use-cases

  public static readonly GetCollectionUseCase: unique symbol = Symbol('GetCollectionUseCase');

  public static readonly CreateCollectionUseCase: unique symbol = Symbol('CreateCollectionUseCase');

  public static readonly EditCollectionUseCase: unique symbol = Symbol('EditCollectionUseCase');

  public static readonly RemoveCollectionUseCase: unique symbol = Symbol('RemoveCollectionUseCase');

  public static readonly RestoreCollectionUseCase: unique symbol = Symbol('RestoreCollectionUseCase');

  // Handlers
  
  public static readonly GetCollectionsQueryHandler: unique symbol = Symbol('GetCollectionsQueryHandler');

  // Repositories

  public static readonly CollectionRepository: unique symbol = Symbol('CollectionRepository');
}
