export class ProfileToken {
  // Use-cases

  public static readonly GetProfileUseCase: unique symbol = Symbol('GetProfileUseCase');

  public static readonly CreateProfileUseCase: unique symbol = Symbol('CreateProfileUseCase');

  public static readonly EditProfileUseCase: unique symbol = Symbol('EditProfileUseCase');

  // Repositories

  public static readonly ProfileRepository: unique symbol = Symbol('ProfileRepository');
}
