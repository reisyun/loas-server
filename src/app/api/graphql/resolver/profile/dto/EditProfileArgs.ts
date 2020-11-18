import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import { Gender, Language } from '@core/domain/profile/entity/Profile';

@ArgsType()
export class EditProfileArgs {
  @Field(() => Int)
  public profileId!: number;

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
