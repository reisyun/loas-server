import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

@ObjectType()
export class CollectionModel implements CollectionUseCaseDto {
  @Field(() => ID)
  public id!: string;

  @Field(() => ID)
  public userId!: string;

  @Field()
  public name!: string;

  @Field({ nullable: true })
  public description?: string;

  @Field()
  public isCustom!: boolean;

  @Field()
  public createdAt!: Date;

  @Field()
  public updatedAt!: Date;

  @Field({ nullable: true })
  public removedAt?: Date;
}
