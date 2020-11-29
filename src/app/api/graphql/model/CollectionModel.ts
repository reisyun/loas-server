import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Category } from '@core/domain/collection/entity/Collection';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

registerEnumType(Category, { name: 'Category' });

@ObjectType()
export class CollectionModel implements CollectionUseCaseDto {
  @Field(() => ID)
  public id!: string;

  @Field(() => ID)
  public collectorId!: string;

  @Field()
  public name!: string;

  @Field({ nullable: true })
  public description?: string;

  @Field(() => Category)
  public category!: Category;

  @Field()
  public createdAt!: Date;

  @Field()
  public updatedAt!: Date;

  @Field({ nullable: true })
  public removedAt?: Date;
}
