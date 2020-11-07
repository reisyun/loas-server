import { Gender, Language } from '@core/domain/profile/entity/Profile';

export interface UpdateProfilePort {
  profileId?: number;
  gender?: Gender;
  language?: Language;
  shortBio?: string;
  avatar?: string;
}
