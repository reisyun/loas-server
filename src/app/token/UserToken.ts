export class UserToken {
  // Use-cases

  public static readonly GetUserUseCase: unique symbol = Symbol('GetUserUseCase');

  public static readonly CreateUserUseCase: unique symbol = Symbol('CreateUserUseCase');

  // Handlers
  public static readonly GetUserQueryHandler: unique symbol = Symbol('GetUserQueryHandler');

  // Repositories

  public static readonly UserRepository: unique symbol = Symbol('UserRepository');
}
