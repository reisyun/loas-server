import { Gender, Language } from '@core/domain/user/value-object/Profile';

export interface EditUserProfilePort {
  executorId: string;
  shortBio?: string;
  avatar?: string;
  gender?: Gender;
  language?: Language;
}
