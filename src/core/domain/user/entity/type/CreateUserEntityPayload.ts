import { UserRole } from '@core/domain/user/entity/User';

export type CreateUserEntityPayload = {
  name: string;
  email: string;
  password: string;
  id?: string;
  role?: UserRole;
  verified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
