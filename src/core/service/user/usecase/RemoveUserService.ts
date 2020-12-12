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

    const collections: GetCollectionsQueryResult[] = await this.queryBus.sendQuery(
      GetCollectionsQuery.new({ collectorId: userId }),
    );

    // Delete User record and Create DeletedUser record
    await this.userRepository.remove(
      user,
      // TODO: 도메인 이벤트 만들기
      collections.map(collection => ({ id: collection.id })),
    );
  }
}
