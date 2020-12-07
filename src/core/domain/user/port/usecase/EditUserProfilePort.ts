import { Gender, Language } from '@core/domain/user/value-object/Profile';

export interface EditUserProfilePort {
  userId: string;
  shortBio?: string;
  avatar?: string;
  gender?: Gender;
  language?: Language;
}
