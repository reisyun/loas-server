import { Module, Provider } from '@nestjs/common';
import { GetUserService } from '@core/service/user/usecase/GetUserService';
import { CreateUserService } from '@core/service/user/usecase/CreateUserService';
import { UserToken } from '@app/token/UserToken';
import { ProfileToken } from '@app/token/ProfileToken';
import { LibraryToken } from '@app/token/LibraryToken';
import { ProfileModule } from '@app/module/ProfileModule';
import { LibraryModule } from '@app/module/LibraryModule';
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
    useFactory: (userRepository, profileRepository, libraryRepository) =>
      new CreateUserService(userRepository, profileRepository, libraryRepository),
    inject: [
      UserToken.UserRepository,
      ProfileToken.ProfileRepository,
      LibraryToken.LibraryRepository,
    ],
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
  imports: [ProfileModule, LibraryModule],
  providers: [UserResolver, ...persistenceProviders, ...useCaseProviders, ...handlerProviders],
  exports: [UserToken.UserRepository, UserToken.GetUserUseCase, UserToken.CreateUserUseCase],
})
export class UserModule {}
