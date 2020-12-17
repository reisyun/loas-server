import { ArgsType, Field, ID } from '@nestjs/graphql';
import { Gender, Language } from '@core/domain/user/value-object/Profile';

@ArgsType()
export class EditUserProfileArgs {
  @Field(() => ID)
  public userId!: string;

  @Field({ nullable: true })
  public shortBio?: string;

  @Field({ nullable: true })
  public avatar?: string;

  @Field(() => Gender, { nullable: true })
  public gender?: Gender;

  @Field(() => Language, { nullable: true })
  public language?: Language;
}
