import { UseCase } from '@core/common/UseCase';
import { EditCollectionPort } from '@core/domain/collection/port/usecase/EditCollectionPort';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EditCollectionUseCase extends UseCase<EditCollectionPort, CollectionUseCaseDto> {}
