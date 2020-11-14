import { Module, Provider } from '@nestjs/common';
import { GetProfileService } from '@core/service/profile/usecase/GetProfileService';
import { CreateProfileService } from '@core/service/profile/usecase/CreateProfileService';
import { ProfileToken } from '@app/token/ProfileToken';
import { ProfileResolver } from '@app/api/graphql/resolver/profile/ProfileResolver';
import { ProfileRepositoryAdapter } from '@infra/adapter/profile/persistence/ProfileRepositoryAdapter';

const persistenceProviders: Provider[] = [
  {
    provide: ProfileToken.ProfileRepository,
    useClass: ProfileRepositoryAdapter,
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: ProfileToken.GetProfileUseCase,
    useFactory: profileRepository => new GetProfileService(profileRepository),
    inject: [ProfileToken.ProfileRepository],
  },
  {
    provide: ProfileToken.CreateProfileUseCase,
    useFactory: profileRepository => new CreateProfileService(profileRepository),
    inject: [ProfileToken.ProfileRepository],
  },
];

@Module({
  providers: [ProfileResolver, ...persistenceProviders, ...useCaseProviders],
  exports: [
    ProfileToken.ProfileRepository,
    ProfileToken.GetProfileUseCase,
    ProfileToken.CreateProfileUseCase,
  ],
})
export class ProfileModule {}
