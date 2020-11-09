import { UseCase } from '@core/common/UseCase';
import { CreateLibraryPort } from '@core/domain/library/port/usecase/CreateLibraryPort';
import { LibraryUseCaseDto } from '@core/domain/library/usecase/dto/LibraryUseCaseDto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateLibraryUseCase extends UseCase<CreateLibraryPort, LibraryUseCaseDto> {}
