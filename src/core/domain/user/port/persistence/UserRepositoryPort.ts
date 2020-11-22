import { Nullable } from '@core/common/Types';
import { UserRepositoryArgs } from '@core/common/persistence/RepositoryArgs';
import { User } from '@core/domain/user/entity/User';

export interface UserRepositoryPort {
  findOne(args: UserRepositoryArgs.FindOne): Promise<Nullable<User>>;

  findMany(args?: UserRepositoryArgs.FindMany): Promise<User[]>;

  count(args?: UserRepositoryArgs.FindMany): Promise<number>;

  create(user: User): Promise<User>;

  update(user: User): Promise<User>;
}
