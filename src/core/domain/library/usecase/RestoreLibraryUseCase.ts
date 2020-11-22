import { UseCase } from '@core/common/UseCase';
import { RestoreLibraryPort } from '@core/domain/library/port/usecase/RestoreLibraryPort';
import { LibraryUseCaseDto } from '@core/domain/library/usecase/dto/LibraryUseCaseDto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RestoreLibraryUseCase extends UseCase<RestoreLibraryPort, LibraryUseCaseDto> {}
