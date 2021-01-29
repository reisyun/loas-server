import { Profile } from '@core/domain/user/value-object/Profile';

export type CreateUserEntityPayload = {
  profile: Profile;
  name: string;
  email: string;
  password: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  removedAt?: Date;
};
