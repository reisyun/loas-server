/* eslint-disable max-classes-per-file */
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Category } from '@core/domain/collection/entity/Collection';

registerEnumType(Category, { name: 'Category' });

@ObjectType()
export class CollectorPreviewModel {
  @Field(() => ID, { nullable: true })
  public id!: string;

  @Field({ nullable: true })
  public name!: string;
}

@ObjectType()
export class CollectionModel {
  @Field(() => ID)
  public id!: string;

  @Field()
  public name!: string;

  @Field({ nullable: true })
  public description?: string;

  @Field(() => Category)
  public category!: Category;

  @Field(() => CollectorPreviewModel)
  public collector!: CollectorPreviewModel;
}
