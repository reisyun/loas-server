import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateLibraryService } from '@core/service/library/usecase/CreateLibraryService';
import { LibraryToken } from '@app/token/LibraryToken';
import { LibraryResolver } from '@app/api/graphql/resolver/library/LibraryResolver';
import { LibraryRepositoryAdapter } from '@infra/adapter/library/persistence/LibraryRepositoryAdapter';
import { CoreToken } from '@app/token/CoreToken';
import { NestQueryBusAdapter } from '@infra/adapter/common/message/NestQueryBusAdapter';

const persistenceProviders: Provider[] = [
  {
    provide: LibraryToken.LibraryRepository,
    useClass: LibraryRepositoryAdapter,
  },
  {
    provide: CoreToken.QueryBus,
    useClass: NestQueryBusAdapter,
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: LibraryToken.CreateLibraryUseCase,
    useFactory: (libraryRepository, queryBus) =>
      new CreateLibraryService(libraryRepository, queryBus),
    inject: [LibraryToken.LibraryRepository, CoreToken.QueryBus],
  },
];

@Module({
  imports: [CqrsModule],
  providers: [LibraryResolver, ...persistenceProviders, ...useCaseProviders],
  exports: [LibraryToken.LibraryRepository],
})
export class LibraryModule {}
