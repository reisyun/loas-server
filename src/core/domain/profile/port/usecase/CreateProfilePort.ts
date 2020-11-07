import { Gender, Language } from '@core/domain/profile/entity/Profile';
import { User } from '@core/domain/user/entity/User';

export interface CreateProfilePort {
  user: User;
  gender?: Gender;
  language?: Language;
  shortBio?: string;
  avatar?: string;
}
