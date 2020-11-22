import { Nullable } from '@core/common/Types';
import { RepositoryFindManyOptions } from '@core/common/persistence/RepositoryOptions';
import { Profile } from '@core/domain/profile/entity/Profile';

export type ProfileWhereInput = {
  id?: number;
  userId?: string;
};

export interface ProfileRepositoryPort {
  findOne(where: ProfileWhereInput): Promise<Nullable<Profile>>;

  findMany(
    where?: ProfileWhereInput,
    options?: RepositoryFindManyOptions<number>,
  ): Promise<Profile[]>;

  count(where?: ProfileWhereInput, options?: RepositoryFindManyOptions<number>): Promise<number>;

  create(profile: Profile): Promise<Profile>;

  update(profile: Profile): Promise<Profile>;
}
