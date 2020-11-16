import { UseCase } from '@core/common/UseCase';
import { GetLibraryPort } from '@core/domain/library/port/usecase/GetLibraryPort';
import { LibraryUseCaseDto } from '@core/domain/library/usecase/dto/LibraryUseCaseDto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetLibraryUseCase extends UseCase<GetLibraryPort, LibraryUseCaseDto> {}
