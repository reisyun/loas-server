import { ObjectType, Field, ID } from '@nestjs/graphql';
import { LibraryUseCaseDto } from '@core/domain/library/usecase/dto/LibraryUseCaseDto';

@ObjectType()
export class LibraryModel implements LibraryUseCaseDto {
  @Field(() => ID)
  public id!: string;

  @Field(() => ID)
  public userId!: string;

  @Field()
  public name!: string;

  @Field({ nullable: true })
  public description?: string;

  @Field()
  public private!: boolean;

  @Field()
  public isCustom!: boolean;

  @Field()
  public createdAt!: Date;

  @Field()
  public updatedAt!: Date;

  @Field({ nullable: true })
  public removedAt?: Date;
}
