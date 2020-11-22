import { Nullable } from '@core/common/Types';
import { ProfileRepositoryArgs } from '@core/common/persistence/RepositoryArgs';
import { Profile } from '@core/domain/profile/entity/Profile';

export interface ProfileRepositoryPort {
  findOne(args: ProfileRepositoryArgs.FindOne): Promise<Nullable<Profile>>;

  findMany(args?: ProfileRepositoryArgs.FindMany): Promise<Profile[]>;

  count(args?: ProfileRepositoryArgs.FindMany): Promise<number>;

  create(profile: Profile): Promise<Profile>;

  update(profile: Profile): Promise<Profile>;
}
