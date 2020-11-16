import { Module, Provider } from '@nestjs/common';
import { GetLibraryService } from '@core/service/library/usecase/GetLibraryService';
import { CreateLibraryService } from '@core/service/library/usecase/CreateLibraryService';
import { CoreToken } from '@app/token/CoreToken';
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
    provide: LibraryToken.GetLibraryUseCase,
    useFactory: libraryRepository => new GetLibraryService(libraryRepository),
    inject: [LibraryToken.LibraryRepository],
  },
  {
    provide: LibraryToken.CreateLibraryUseCase,
    useFactory: (libraryRepository, queryBus) =>
      new CreateLibraryService(libraryRepository, queryBus),
    inject: [LibraryToken.LibraryRepository, CoreToken.QueryBus],
  },
];

@Module({
  providers: [LibraryResolver, ...persistenceProviders, ...useCaseProviders],
  exports: [LibraryToken.LibraryRepository],
})
export class LibraryModule {}
