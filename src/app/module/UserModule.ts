import { Module, Provider } from '@nestjs/common';

import { GetUserService } from '@core/service/user/usecase/GetUserService';
import { CreateUserService } from '@core/service/user/usecase/CreateUserService';
import { UserToken } from '@app/token/UserToken';
import { UserResolver } from '@app/api/graphql/resolver/user/UserResolver';
import { UserRepositoryAdapter } from '@infra/adapter/user/persistence/UserRepositoryAdapter';

import { GetProfileService } from '@core/service/profile/usecase/GetProfileService';
import { ProfileToken } from '@app/token/ProfileToken';
import { ProfileRepositoryAdapter } from '@infra/adapter/profile/persistence/ProfileRepositoryAdapter';

import { LibraryToken } from '@app/token/LibraryToken';
import { LibraryRepositoryAdapter } from '@infra/adapter/library/persistence/LibraryRepositoryAdapter';

const persistenceProviders: Provider[] = [
  {
    provide: UserToken.UserRepository,
    useClass: UserRepositoryAdapter,
  },
  {
    provide: ProfileToken.ProfileRepository,
    useClass: ProfileRepositoryAdapter,
  },
  {
    provide: LibraryToken.LibraryRepository,
    useClass: LibraryRepositoryAdapter,
  },
];

const useCaseProviders: Provider[] = [
  // user
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
  // profile
  {
    provide: ProfileToken.GetProfileUseCase,
    useFactory: profileRepository => new GetProfileService(profileRepository),
    inject: [ProfileToken.ProfileRepository],
  },
];

@Module({
  providers: [UserResolver, ...persistenceProviders, ...useCaseProviders],
  exports: [UserToken.UserRepository, UserToken.GetUserUseCase, UserToken.CreateUserUseCase],
})
export class UserModule {}
