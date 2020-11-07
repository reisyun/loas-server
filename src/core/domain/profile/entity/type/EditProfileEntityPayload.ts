import { Gender, Language } from '@core/domain/profile/entity/Profile';

export type EditProfileEntityPayload = {
  gender?: Gender;
  language?: Language;
  shortBio?: string;
  avatar?: string;
};
