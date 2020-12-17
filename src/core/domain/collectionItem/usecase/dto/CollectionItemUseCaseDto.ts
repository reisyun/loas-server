import { Exclude, Expose, plainToClass } from 'class-transformer';
import { Nullable } from '@core/common/Types';
import { CollectionItem } from '@core/domain/collectionItem/entity/CollectionItem';
import { Collection } from '@core/domain/collectionItem/value-object/Collection';
import { Category } from '@core/domain/collection/entity/Collection';

@Exclude()
export class CollectionItemUseCaseDto {
  @Expose()
  public id!: string;

  @Expose()
  public private!: boolean;

  @Expose()
  public completedAt!: Date;

  @Expose()
  public like!: Nullable<boolean>;

  @Expose()
  public repeat!: number;

  public createdAt!: Date;

  public updatedAt!: Date;

  @Expose()
  public collection!: {
    id: string;
    category: Category;
  };

  public static newFromCollectionItem(collectionItem: CollectionItem): CollectionItemUseCaseDto {
    const dto: CollectionItemUseCaseDto = plainToClass(CollectionItemUseCaseDto, collectionItem);
    const collection: Collection = collectionItem.getCollection;

    dto.collection = {
      id: collection.getId,
      category: collection.getCategory,
    };

    return dto;
  }

  public static newListFromCollectionItems(
    collectionItems: CollectionItem[],
  ): CollectionItemUseCaseDto[] {
    return collectionItems.map(collectionItem => this.newFromCollectionItem(collectionItem));
  }
}
