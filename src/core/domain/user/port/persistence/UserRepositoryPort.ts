import { Nullable } from '@core/common/Types';
import { RepositoryFindManyOptions } from '@core/common/persistence/RepositoryOptions';
import { User } from '@core/domain/user/entity/User';

export type UserWhereInput = {
  id?: string;
  email?: string;
};

export interface UserRepositoryPort {
  findOne(where: UserWhereInput): Promise<Nullable<User>>;

  findMany(
    where?: UserWhereInput & { name?: string },
    options?: RepositoryFindManyOptions<string>,
  ): Promise<User[]>;

  count(where?: UserWhereInput, options?: RepositoryFindManyOptions<string>): Promise<number>;

  create(user: User): Promise<User>;

  update(user: User): Promise<User>;
}
