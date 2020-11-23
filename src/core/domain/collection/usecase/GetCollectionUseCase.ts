import { UseCase } from '@core/common/UseCase';
import { GetCollectionPort } from '@core/domain/collection/port/usecase/GetCollectionPort';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetCollectionUseCase extends UseCase<GetCollectionPort, CollectionUseCaseDto[]> {}
