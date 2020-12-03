import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/util/CoreAssert';
import { QueryBusPort } from '@core/common/message/query/QueryBusPort';
import { GetCollectionsQuery } from '@core/domain/collection/handler/query/GetCollectionsQuery';
import { GetCollectionsQueryResult } from '@core/domain/collection/handler/query/GetCollectionsQueryResult';
import { User } from '@core/domain/user/entity/User';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { RemoveUserPort } from '@core/domain/user/port/usecase/RemoveUserPort';
import { RemoveUserUseCase } from '@core/domain/user/usecase/RemoveUserUseCase';

export class RemoveUserService implements RemoveUserUseCase {
  private readonly userRepository: UserRepositoryPort;

  private readonly queryBus: QueryBusPort;

  public constructor(userRepository: UserRepositoryPort, queryBus: QueryBusPort) {
    this.userRepository = userRepository;
    this.queryBus = queryBus;
  }

  public async execute(payload: RemoveUserPort): Promise<void> {
    const { userId, confirm } = payload;

    const user: User = CoreAssert.notEmpty(
      await this.userRepository.findOne({ where: { id: userId } }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'User not found',
      }),
    );

    CoreAssert.isTrue(confirm, Exception.new({ code: Code.ACCESS_DENIED_ERROR }));

    // user의 컬렉션들을 가져옴
    const collections: GetCollectionsQueryResult[] = CoreAssert.notEmpty(
      await this.queryBus.sendQuery(GetCollectionsQuery.new({ collectorId: userId })),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'Invalid user ID.',
      }),
    );

    // Delete User record and Create DeletedUser record
    await this.userRepository.remove(
      user,
      // TODO: User Aggregate에 Collction Aggregate의 id만 참조해서 넘겨줄지 고민.
      collections.map(collection => ({ id: collection.id })),
    );
  }
}
