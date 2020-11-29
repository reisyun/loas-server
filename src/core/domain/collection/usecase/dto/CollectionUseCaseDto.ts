import { Exclude, Expose, plainToClass } from 'class-transformer';
import { Collection, Category } from '@core/domain/collection/entity/Collection';

@Exclude()
export class CollectionUseCaseDto {
  @Expose()
  public id!: string;

  public collector!: { id: string; name: string };

  @Expose()
  public name!: string;

  @Expose()
  public description?: string;

  @Expose()
  public category!: Category;

  @Expose()
  public createdAt!: Date;

  @Expose()
  public updatedAt!: Date;

  @Expose()
  public removedAt?: Date;

  public static newFromCollection(collection: Collection): CollectionUseCaseDto {
    const dto: CollectionUseCaseDto = plainToClass(CollectionUseCaseDto, collection);
    return dto;
  }

  public static newListFromCollections(collections: Collection[]): CollectionUseCaseDto[] {
    return collections.map(collection => this.newFromCollection(collection));
  }
}
