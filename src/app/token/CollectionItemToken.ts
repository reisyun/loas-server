// prettier-ignore
export class CollectionItemToken {
  // Use-cases

  public static readonly AddCollectionItemUseCase: unique symbol = Symbol('AddCollectionItemUseCase');

  // Repositories

  public static readonly CollectionItemRepository: unique symbol = Symbol('CollectionItemRepository');
}
