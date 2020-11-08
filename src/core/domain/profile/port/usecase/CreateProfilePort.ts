import { Gender, Language } from '@core/domain/profile/entity/Profile';

export interface CreateProfilePort {
  userId: string;
  gender?: Gender;
  language?: Language;
  shortBio?: string;
  avatar?: string;
}
