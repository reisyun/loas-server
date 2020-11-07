import { Module, Provider } from '@nestjs/common';

import { GetUserService } from '@core/service/user/usecase/GetUserService';
import { CreateUserService } from '@core/service/user/usecase/CreateUserService';
import { UserToken } from '@app/token/UserToken';
import { UserResolver } from '@app/api/graphql/resolver/UserResolver';
import { UserRepositoryAdapter } from '@infra/adapter/persistence/user/repository/UserRepositoryAdapter';

import { GetProfileService } from '@core/service/profile/usecase/GetProfileService';
import { ProfileToken } from '@app/token/ProfileToken';
import { ProfileRepositoryAdapter } from '@infra/adapter/persistence/profile/repository/ProfileRepositoryAdapter';

const persistenceProviders: Provider[] = [
  {
    provide: UserToken.UserRepository,
    useClass: UserRepositoryAdapter,
  },
  {
    provide: ProfileToken.ProfileRepository,
    useClass: ProfileRepositoryAdapter,
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
    useFactory: (userRepository, profileRepository) =>
      new CreateUserService(userRepository, profileRepository),
    inject: [UserToken.UserRepository, ProfileToken.ProfileRepository],
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
