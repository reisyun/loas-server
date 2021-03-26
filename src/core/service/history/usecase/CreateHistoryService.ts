import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';

import { History } from '@core/domain/history/entity/History';
import { Media } from '@core/domain/history/value-object/Media';

import { HistoryRepositoryPort } from '@core/domain/history/port/persistence/HistoryRepositoryPort';
import { CreateHistoryPort } from '@core/domain/history/port/usecase/CreateHistoryPort';
import { HistoryUseCaseDto } from '@core/domain/history/usecase/dto/HistoryUseCaseDto';
import { CreateHistoryUseCase } from '@core/domain/history/usecase/CreateHistoryUseCase';

export class CreateHistoryService implements CreateHistoryUseCase {
  private readonly historyRepository: HistoryRepositoryPort;

  public constructor(historyRepository: HistoryRepositoryPort) {
    this.historyRepository = historyRepository;
  }

  public async execute(payload: CreateHistoryPort): Promise<HistoryUseCaseDto> {
    const { executorId, mediaId, status, repeat, secret, completedAt } = payload;

    // TODO: 미디어가 존재하는지 확인하기

    // create history는 update와 혼용(merge)하지 않는게 맞다고 생각함.
    // 그러므로 이미 존재하는 history는 예외처리.

    // TODO: 이 부분은 클라이언트와 연동할 때 다시 살펴봐야 할 것 같음.
    const doesHistoryExist = !!(await this.historyRepository.count({
      where: { AND: { userId: executorId, mediaId } },
    }));

    CoreAssert.isFalse(
      doesHistoryExist,
      Exception.new({
        code: Code.ENTITY_ALREADY_EXISTS_ERROR,
        overrideMessage: 'This history already exists.',
      }),
    );

    const history: History = await History.new({
      media: new Media(mediaId),
      ownerId: executorId,
      status,
      repeat,
      secret,
      completedAt,
    });

    await this.historyRepository.create(history);

    return HistoryUseCaseDto.newFromHistory(history);
  }
}
