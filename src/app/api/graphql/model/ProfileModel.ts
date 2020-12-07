import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Gender, Language } from '@core/domain/user/value-object/Profile';

registerEnumType(Gender, { name: 'Gender' });
registerEnumType(Language, { name: 'Language' });

@ObjectType()
export class ProfileModel {
  @Field({ nullable: true })
  public shortBio?: string;

  @Field({ nullable: true })
  public avatar?: string;

  @Field(() => Gender)
  public gender!: Gender;

  @Field(() => Language)
  public language!: Language;
}
