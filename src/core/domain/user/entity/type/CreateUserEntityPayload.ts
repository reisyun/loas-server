import { UserRole } from '@core/domain/user/entity/User';
import { Profile } from '@core/domain/user/entity/Profile';

export type CreateUserEntityPayload = {
  profile: Profile;
  name: string;
  email: string;
  password: string;
  id?: string;
  role?: UserRole;
  verified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
