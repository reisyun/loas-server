import { IsUUID, IsEnum } from 'class-validator';
import { ValueObject } from '@core/common/ValueObject';
import { Category } from '@core/domain/collection/entity/Collection';

export class Collection extends ValueObject {
  @IsUUID()
  private id: string;

  @IsEnum(Category)
  private category: Category;

  constructor(id: string, category: Category) {
    super();

    this.id = id;
    this.category = category;
  }

  public static async new(id: string, category: Category): Promise<Collection> {
    const collection = new Collection(id, category);
    await collection.validate();

    return collection;
  }

  public get getId(): string {
    return this.id;
  }

  public get getCategory(): Category {
    return this.category;
  }
}
