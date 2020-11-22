import { Nullable } from '@core/common/Types';
import { GetUserQuery } from '@core/domain/user/handler/query/GetUserQuery';
import { GetUserQueryResult } from '@core/domain/user/handler/query/GetUserQueryResult';
import { User } from '@core/domain/user/entity/User';
import { GetUserQueryHandler } from '@core/domain/user/handler/GetUserQueryHandler';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';

export class HandleGetUserQueryService implements GetUserQueryHandler {
  private readonly userRepository: UserRepositoryPort;

  constructor(userRepository: UserRepositoryPort) {
    this.userRepository = userRepository;
  }

  public async handle(query: GetUserQuery): Promise<Nullable<GetUserQueryResult>> {
    let queryResult: Nullable<GetUserQueryResult> = null;

    const user: Nullable<User> = await this.userRepository.findOne({ where: query.where });
    if (user) {
      queryResult = GetUserQueryResult.new({ id: user.getId, name: user.getName });
    }

    return queryResult;
  }
}
