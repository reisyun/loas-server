import { Module, Provider } from '@nestjs/common';

import { GetUserService } from '@core/service/user/usecase/GetUserService';
import { CreateUserService } from '@core/service/user/usecase/CreateUserService';
import { EditUserProfileService } from '@core/service/user/usecase/EditUserProfileService';
import { ChangeUserPasswordService } from '@core/service/user/usecase/ChangeUserPasswordService';
import { RemoveUserService } from '@core/service/user/usecase/RemoveUserService';

import { HandleGetUserQueryService } from '@core/service/user/handler/HandleGetUserQueryService';

import { CoreToken } from '@app/token/CoreToken';
import { UserToken } from '@app/token/UserToken';
import { UserResolver } from '@app/api/graphql/resolver/user/UserResolver';

import { UserRepositoryAdapter } from '@infra/adapter/user/persistence/UserRepositoryAdapter';
import { NestGetUserQueryHandler } from '@infra/handler/user/NestGetUserQueryHandler';

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
    useFactory: (userRepository, eventBus) => new CreateUserService(userRepository, eventBus),
    inject: [UserToken.UserRepository, CoreToken.EventBus],
  },
  {
    provide: UserToken.EditUserProfileUseCase,
    useFactory: userRepository => new EditUserProfileService(userRepository),
    inject: [UserToken.UserRepository],
  },
  {
    provide: UserToken.ChangeUserPasswordUseCase,
    useFactory: userRepository => new ChangeUserPasswordService(userRepository),
    inject: [UserToken.UserRepository],
  },
  {
    provide: UserToken.RemoveUserUseCase,
    useFactory: userRepository => new RemoveUserService(userRepository),
    inject: [UserToken.UserRepository],
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
