import { Exclude, Expose, plainToClass } from 'class-transformer';
import { User, UserRole } from '@core/domain/user/entity/User';

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

  public static newFromUser(user: User): UserUseCaseDto {
    const dto: UserUseCaseDto = plainToClass(UserUseCaseDto, user);
    return dto;
  }

  public static newListFromUsers(users: User[]): UserUseCaseDto[] {
    return users.map(user => this.newFromUser(user));
  }
}
