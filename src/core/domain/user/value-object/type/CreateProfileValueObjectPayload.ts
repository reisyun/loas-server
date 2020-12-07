import { Gender, Language } from '@core/domain/user/value-object/Profile';

export type CreateProfileValueObjectPayload = {
  shortBio?: string;
  avatar?: string;
  gender?: Gender;
  language?: Language;
};
