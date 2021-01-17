import { Gender, Language } from '@core/common/enums/UserEnums';

export type CreateProfileValueObjectPayload = {
  shortBio?: string;
  avatar?: string;
  gender?: Gender;
  language?: Language;
};
