import { Module, Provider } from '@nestjs/common';
import { GetUserService } from '@core/service/user/usecase/GetUserService';
import { CreateUserService } from '@core/service/user/usecase/CreateUserService';
import { RemoveUserService } from '@core/service/user/usecase/RemoveUserService';
import { CoreToken } from '@app/token/CoreToken';
import { UserToken } from '@app/token/UserToken';
import { UserResolver } from '@app/api/graphql/resolver/user/UserResolver';
import { UserRepositoryAdapter } from '@infra/adapter/user/persistence/UserRepositoryAdapter';
import { NestGetUserQueryHandler } from '@infra/handler/user/NestGetUserQueryHandler';
import { HandleGetUserQueryService } from '@core/service/user/handler/HandleGetUserQueryService';

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
  {
    provide: UserToken.RemoveUserUseCase,
    useFactory: (userRepository, queryBus) => new RemoveUserService(userRepository, queryBus),
    inject: [UserToken.UserRepository, CoreToken.QueryBus],
  },
];

const handlerProviders: Provider[] = [
  NestGetUserQueryHandler,
  {
    provide: UserToken.GetUserQueryHandler,
    useFactory: userRepository => new HandleGetUserQueryService(userRepository),
    inject: [UserToken.UserRepository],
  },
];

@Module({
  providers: [UserResolver, ...persistenceProviders, ...useCaseProviders, ...handlerProviders],
  exports: [UserToken.UserRepository, UserToken.GetUserUseCase, UserToken.CreateUserUseCase],
})
export class UserModule {}
