import { Gender, Language } from '@core/domain/profile/entity/Profile';

export interface EditProfilePort {
  profileId: number;
  userId: string;
  shortBio?: string;
  avatar?: string;
  gender?: Gender;
  language?: Language;
}
