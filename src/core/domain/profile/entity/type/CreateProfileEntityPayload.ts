import { Gender, Language } from '@core/domain/profile/entity/Profile';

export type CreateProfileEntityPayload = {
  userId: string;
  gender?: Gender;
  language?: Language;
  shortBio?: string;
  avatar?: string;
  id?: number;
};
