import { Exclude, Expose, plainToClass } from 'class-transformer';
import { User, UserRole } from '@core/domain/user/entity/User';
import { Profile } from '@core/domain/profile/entity/Profile';

@Exclude()
export class UserUseCaseDto {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public verified!: boolean;

  @Expose()
  public role!: UserRole;

  @Expose()
  public createdAt!: Date;

  @Expose()
  public updatedAt!: Date;

  @Expose()
  public removedAt?: Date;

  public static newFromUser(user: User): UserUseCaseDto {
    const dto = plainToClass(UserUseCaseDto, user);
    return dto;
  }

  public static newListFromUsers(users: User[]): UserUseCaseDto[] {
    return users.map(user => this.newFromUser(user));
  }
}
