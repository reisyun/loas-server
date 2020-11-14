import { Module, Provider } from '@nestjs/common';
import { CreateLibraryService } from '@core/service/library/usecase/CreateLibraryService';
import { LibraryToken } from '@app/token/LibraryToken';
import { LibraryResolver } from '@app/api/graphql/resolver/library/LibraryResolver';
import { LibraryRepositoryAdapter } from '@infra/adapter/library/persistence/LibraryRepositoryAdapter';

const persistenceProviders: Provider[] = [
  {
    provide: LibraryToken.LibraryRepository,
    useClass: LibraryRepositoryAdapter,
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: LibraryToken.CreateLibraryUseCase,
    useFactory: libraryRepository => new CreateLibraryService(libraryRepository),
    inject: [LibraryToken.LibraryRepository],
  },
];

@Module({
  providers: [LibraryResolver, ...persistenceProviders, ...useCaseProviders],
  exports: [LibraryToken.LibraryRepository, LibraryToken.CreateLibraryUseCase],
})
export class LibraryModule {}
