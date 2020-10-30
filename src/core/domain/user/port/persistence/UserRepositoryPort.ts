import { Nullable } from '@core/common/Types';
import { RepositoryFindManyOptions } from '@core/common/persistence/RepositoryOptions';
import { User } from '@core/domain/user/entity/User';

export interface UserRepositoryPort {
  findOne(where: { id?: string; email?: string }): Promise<Nullable<User>>;

  findMany(where?: { name?: string }, options?: RepositoryFindManyOptions): Promise<User[]>;

  count(
    where?: { id?: string; email?: string },
    options?: RepositoryFindManyOptions,
  ): Promise<number>;

  create(user: User): Promise<User>;

  update(user: User): Promise<User>;
}
