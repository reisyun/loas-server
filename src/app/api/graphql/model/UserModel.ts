import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { UserRole } from '@core/domain/user/entity/User';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
export class UserModel implements UserUseCaseDto {
  @Field(() => ID)
  public id!: string;

  @Field()
  public name!: string;

  @Field()
  public email!: string;

  @Field()
  public verified!: boolean;

  @Field(() => UserRole)
  public role!: UserRole;

  @Field()
  public createdAt!: Date;

  @Field()
  public updatedAt!: Date;
}
