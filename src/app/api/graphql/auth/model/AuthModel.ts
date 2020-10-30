import { ObjectType, Field } from '@nestjs/graphql';
import { UserModel } from '@app/api/graphql/user/model/UserModel';

@ObjectType()
export class AuthModel {
  @Field()
  public accessToken!: string;

  @Field(() => UserModel)
  public user!: UserModel;
}
