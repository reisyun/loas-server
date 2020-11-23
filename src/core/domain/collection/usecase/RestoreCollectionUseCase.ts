import { UseCase } from '@core/common/UseCase';
import { RestoreCollectionPort } from '@core/domain/collection/port/usecase/RestoreCollectionPort';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RestoreCollectionUseCase
  extends UseCase<RestoreCollectionPort, CollectionUseCaseDto> {}
