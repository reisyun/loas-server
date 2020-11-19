import { UseCase } from '@core/common/UseCase';
import { EditLibraryPort } from '@core/domain/library/port/usecase/EditLibraryPort';
import { LibraryUseCaseDto } from '@core/domain/library/usecase/dto/LibraryUseCaseDto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EditLibraryUseCase extends UseCase<EditLibraryPort, LibraryUseCaseDto> {}
