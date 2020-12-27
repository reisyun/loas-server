import { Exclude, Expose, plainToClass } from 'class-transformer';
import { Nullable } from '@core/common/Types';
import { Collection } from '@core/domain/collection/entity/Collection';
import { Collector } from '@core/domain/collection/value-object/Collector';
import { CollectionItem } from '../../entity/CollectionItem';

@Exclude()
export class CollectionUseCaseDto {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public description?: string;

  @Expose()
  public private!: boolean;

  public createdAt!: Date;

  public updatedAt!: Date;

  @Expose()
  public removedAt!: Nullable<Date>;

  @Expose()
  public collector!: {
    id: string;
    name: string;
  };

  @Expose()
  public collectionItems!: Array<{
    mediaId: number;
    updatedAt: Date;
  }>;

  public static newFromCollection(collection: Collection): CollectionUseCaseDto {
    const dto: CollectionUseCaseDto = plainToClass(CollectionUseCaseDto, collection);
    const collector: Collector = collection.getCollector;
    const collectionItems: Array<CollectionItem> = collection.getCollectionItems;

    dto.collector = {
      id: collector.getId,
      name: collector.getName,
    };

    dto.collectionItems = collectionItems.map((collectionItem: CollectionItem) => ({
      mediaId: collectionItem.getMediaId,
      updatedAt: collectionItem.getUpdatedAt,
    }));

    return dto;
  }

  public static newListFromCollections(collections: Collection[]): CollectionUseCaseDto[] {
    return collections.map(collection => this.newFromCollection(collection));
  }
}
