// prettier-ignore
export class UserToken {
  // Use-cases

  public static readonly GetUserUseCase: unique symbol = Symbol('GetUserUseCase');

  public static readonly CreateUserUseCase: unique symbol = Symbol('CreateUserUseCase');

  public static readonly EditUserProfileUseCase: unique symbol = Symbol('EditUserProfileUseCase');

  public static readonly ChangeUserPasswordUseCase: unique symbol = Symbol('ChangeUserPasswordUseCase');

  public static readonly RemoveUserUseCase: unique symbol = Symbol('RemoveUserUseCase');

  // Handlers
  public static readonly GetUserQueryHandler: unique symbol = Symbol('GetUserQueryHandler');

  // Repositories

  public static readonly UserRepository: unique symbol = Symbol('UserRepository');
}
