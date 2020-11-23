import { UseCase } from '@core/common/UseCase';
import { RemoveCollectionPort } from '@core/domain/collection/port/usecase/RemoveCollectionPort';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RemoveCollectionUseCase
  extends UseCase<RemoveCollectionPort, CollectionUseCaseDto> {}
