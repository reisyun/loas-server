import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { UserRole } from '@core/domain/user/entity/User';
import { ProfileModel } from '@app/api/graphql/model/ProfileModel';

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
export class UserModel {
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

  @Field(() => ProfileModel)
  public profile!: ProfileModel;
}
