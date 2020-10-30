export class UserToken {
  // Use-cases

  public static readonly CreateUserUseCase: unique symbol = Symbol('CreateUserUseCase');

  public static readonly GetUserUseCase: unique symbol = Symbol('GetUserUseCase');

  // Repositories

  public static readonly UserRepository: unique symbol = Symbol('UserRepository');
}
