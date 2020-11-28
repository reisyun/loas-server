import { ObjectType, Field, ID, Int, registerEnumType } from '@nestjs/graphql';
import { Gender, Language } from '@core/domain/profile/entity/Profile';
import { ProfileUseCaseDto } from '@core/domain/profile/usecase/dto/ProfileUseCaseDto';

registerEnumType(Gender, { name: 'Gender' });
registerEnumType(Language, { name: 'Language' });

@ObjectType()
export class ProfileModel implements ProfileUseCaseDto {
  @Field(() => Int)
  public id!: number;

  @Field(() => ID)
  public userId!: string;

  @Field({ nullable: true })
  public shortBio?: string;

  @Field({ nullable: true })
  public avatar?: string;

  @Field(() => Gender)
  public gender!: Gender;

  @Field(() => Language)
  public language!: Language;

  @Field()
  public createdAt!: Date;

  @Field()
  public updatedAt!: Date;
}
