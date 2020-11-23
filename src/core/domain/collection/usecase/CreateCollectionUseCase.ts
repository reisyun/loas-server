import { UseCase } from '@core/common/UseCase';
import { CreateCollectionPort } from '@core/domain/collection/port/usecase/CreateCollectionPort';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateCollectionUseCase
  extends UseCase<CreateCollectionPort, CollectionUseCaseDto> {}
