export class LibraryToken {
  // Use-cases

  public static readonly CreateLibraryUseCase: unique symbol = Symbol('CreateLibraryUseCase');

  public static readonly GetLibraryUseCase: unique symbol = Symbol('GetLibraryUseCase');

  // Repositories

  public static readonly LibraryRepository: unique symbol = Symbol('LibraryRepository');
}
