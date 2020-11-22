import { UseCase } from '@core/common/UseCase';
import { RemoveLibraryPort } from '@core/domain/library/port/usecase/RemoveLibraryPort';
import { LibraryUseCaseDto } from '@core/domain/library/usecase/dto/LibraryUseCaseDto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RemoveLibraryUseCase extends UseCase<RemoveLibraryPort, LibraryUseCaseDto> {}
