export class ProfileToken {
  // Use-cases

  public static readonly CreateProfileUseCase: unique symbol = Symbol('CreateProfileUseCase');

  public static readonly GetProfileUseCase: unique symbol = Symbol('GetProfileUseCase');

  // Repositories

  public static readonly ProfileRepository: unique symbol = Symbol('ProfileRepository');
}
