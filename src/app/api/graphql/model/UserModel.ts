import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProfileModel } from '@app/api/graphql/model/ProfileModel';

@ObjectType()
export class UserModel {
  @Field(() => ID)
  public id!: string;

  @Field()
  public name!: string;

  @Field()
  public email!: string;

  @Field(() => ProfileModel)
  public profile!: ProfileModel;
}
