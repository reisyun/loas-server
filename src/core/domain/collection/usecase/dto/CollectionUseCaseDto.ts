import { Exclude, Expose, plainToClass } from 'class-transformer';
import { Nullable } from '@core/common/Types';
import { Collection, Category } from '@core/domain/collection/entity/Collection';
import { Collector } from '@core/domain/collection/value-object/Collector';

@Exclude()
export class CollectionUseCaseDto {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public description?: string;

  @Expose()
  public category!: Category;

  public createdAt!: Date;

  public updatedAt!: Date;

  @Expose()
  public removedAt!: Nullable<Date>;

  @Expose()
  public collector!: {
    id: string;
    name: string;
  };

  public static newFromCollection(collection: Collection): CollectionUseCaseDto {
    const dto: CollectionUseCaseDto = plainToClass(CollectionUseCaseDto, collection);
    const collector: Collector = collection.getCollector;

    dto.collector = {
      id: collector.getId,
      name: collector.getName,
    };

    return dto;
  }

  public static newListFromCollections(collections: Collection[]): CollectionUseCaseDto[] {
    return collections.map(collection => this.newFromCollection(collection));
  }
}
