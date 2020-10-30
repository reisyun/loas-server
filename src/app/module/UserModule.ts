import { Module, Provider } from '@nestjs/common';
import { GetUserService } from '@core/service/user/usecase/GetUserService';
import { CreateUserService } from '@core/service/user/usecase/CreateUserService';
import { UserToken } from '@app/token/UserToken';
import { UserResolver } from '@app/api/graphql/user/resolver/UserResolver';
import { UserRepositoryAdapter } from '@infra/adapter/persistence/user/repository/UserRepositoryAdapter';

const persistenceProviders: Provider[] = [
  {
    provide: UserToken.UserRepository,
    useClass: UserRepositoryAdapter,
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: UserToken.GetUserUseCase,
    useFactory: userRepository => new GetUserService(userRepository),
    inject: [UserToken.UserRepository],
  },
  {
    provide: UserToken.CreateUserUseCase,
    useFactory: userRepository => new CreateUserService(userRepository),
    inject: [UserToken.UserRepository],
  },
];

@Module({
  providers: [
    // UserResolver,
    ...persistenceProviders,
    ...useCaseProviders,
  ],
  exports: [UserToken.UserRepository, UserToken.GetUserUseCase, UserToken.CreateUserUseCase],
})
export class UserModule {}
