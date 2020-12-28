// prettier-ignore
export class CollectionToken {
  // Use-cases

  public static readonly GetCollectionUseCase: unique symbol = Symbol('GetCollectionUseCase');

  public static readonly GetCollectionListUseCase: unique symbol = Symbol('GetCollectionListUseCase');

  public static readonly CreateCollectionUseCase: unique symbol = Symbol('CreateCollectionUseCase');

  public static readonly EditCollectionUseCase: unique symbol = Symbol('EditCollectionUseCase');

  public static readonly RemoveCollectionUseCase: unique symbol = Symbol('RemoveCollectionUseCase');

  public static readonly RestoreCollectionUseCase: unique symbol = Symbol('RestoreCollectionUseCase');

  public static readonly AddCollectionItemUseCase: unique symbol = Symbol('AddCollectionItemUseCase');

  public static readonly DeleteCollectionItemUseCase: unique symbol = Symbol('DeleteCollectionItemUseCase');

  // Handlers
  
  public static readonly GetCollectionQueryHandler: unique symbol = Symbol('GetCollectionQueryHandler');

  // Repositories

  public static readonly CollectionRepository: unique symbol = Symbol('CollectionRepository');
}
