export class ProfileToken {
  // Use-cases

  public static readonly GetProfileUseCase: unique symbol = Symbol('GetProfileUseCase');

  public static readonly CreateProfileUseCase: unique symbol = Symbol('CreateProfileUseCase');

  // Repositories

  public static readonly ProfileRepository: unique symbol = Symbol('ProfileRepository');
}
