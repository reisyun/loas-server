import { Profile } from '@core/domain/user/entity/Profile';

export type EditUserEntityPayload = {
  profile?: Profile;
  name?: string;
  email?: string;
  password?: string;
  verified?: boolean;
};
