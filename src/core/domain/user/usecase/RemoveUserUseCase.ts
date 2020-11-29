import { UseCase } from '@core/common/UseCase';
import { RemoveUserPort } from '@core/domain/user/port/usecase/RemoveUserPort';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RemoveUserUseCase extends UseCase<RemoveUserPort, void> {}
