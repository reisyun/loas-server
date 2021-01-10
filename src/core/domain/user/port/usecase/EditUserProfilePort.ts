import { Gender, Language } from '@core/common/enums/UserEnums';

export interface EditUserProfilePort {
  executorId: string;
  shortBio?: string;
  avatar?: string;
  gender?: Gender;
  language?: Language;
}
