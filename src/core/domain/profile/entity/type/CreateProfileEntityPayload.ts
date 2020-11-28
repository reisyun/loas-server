import { Gender, Language } from '@core/domain/profile/entity/Profile';

export type CreateProfileEntityPayload = {
  userId: string;
  id: number;
  gender?: Gender;
  language?: Language;
  shortBio?: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
  removedAt?: Date;
};
