export class UserToken {
  // Use-cases

  public static readonly GetUserUseCase: unique symbol = Symbol('GetUserUseCase');

  public static readonly CreateUserUseCase: unique symbol = Symbol('CreateUserUseCase');

  // Repositories

  public static readonly UserRepository: unique symbol = Symbol('UserRepository');
}
