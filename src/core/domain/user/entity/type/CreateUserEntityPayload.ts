import { UserRole } from '@core/common/enums/UserEnums';
import { Profile } from '@core/domain/user/value-object/Profile';

export type CreateUserEntityPayload = {
  profile: Profile;
  name: string;
  email: string;
  password: string;
  id?: string;
  verified?: boolean;
  role?: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
  removedAt?: Date;
};
