export class LibraryToken {
  // Use-cases

  public static readonly GetLibraryUseCase: unique symbol = Symbol('GetLibraryUseCase');

  public static readonly CreateLibraryUseCase: unique symbol = Symbol('CreateLibraryUseCase');

  // Repositories

  public static readonly LibraryRepository: unique symbol = Symbol('LibraryRepository');
}
