import { InputType, Field } from '@nestjs/graphql';
import { Gender, Language } from '@core/domain/profile/entity/Profile';

@InputType()
export class EditProfileArgs {
  @Field()
  public profileId!: number;

  @Field()
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
