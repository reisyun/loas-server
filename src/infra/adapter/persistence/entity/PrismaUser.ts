import { User, UserProfile } from '@prisma/client';
import { Nullable } from '@core/common/Types';

export interface PrismaUser extends User {
  profile: Nullable<UserProfile>;
}
