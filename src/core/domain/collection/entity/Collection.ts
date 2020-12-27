import {
  IsString,
  IsBoolean,
  IsArray,
  IsDate,
  IsOptional,
  IsInstance,
  ValidateNested,
} from 'class-validator';
import { v4 } from 'uuid';
import { Entity } from '@core/common/Entity';
import { Nullable } from '@core/common/Types';
import { CollectionItem } from '@core/domain/collection/entity/CollectionItem';
import { Collector } from '@core/domain/collection/value-object/Collector';
import { CreateCollectionEntityPayload } from '@core/domain/collection/entity/type/CreateCollectionEntityPayload';
import { EditCollectionEntityPayload } from '@core/domain/collection/entity/type/EditCollectionEntityPayload';

export class Collection extends Entity<string> {
  @IsInstance(Collector)
  private readonly collector: Collector;

  @IsString()
  private name: string;

  @IsString()
  @IsOptional()
  private description: Nullable<string>;

  @IsBoolean()
  private private: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  private collectionItems: Array<CollectionItem>;

  @IsDate()
  private readonly createdAt: Date;

  @IsDate()
  private updatedAt: Date;

  @IsDate()
  @IsOptional()
  private removedAt: Nullable<Date>;

  public constructor(payload: CreateCollectionEntityPayload) {
    super();

    this.collector = payload.collector;
    this.name = payload.name;

    this.id = payload.id ?? v4();
    this.description = payload.description ?? null;
    this.private = payload.private ?? false;
    this.collectionItems = payload.collectionItems ?? [];
    this.createdAt = payload.createdAt ?? new Date();
    this.updatedAt = payload.updatedAt ?? new Date();
    this.removedAt = payload.removedAt ?? null;
  }

  public static async new(payload: CreateCollectionEntityPayload): Promise<Collection> {
    const collection = new Collection(payload);
    await collection.validate();

    return collection;
  }

  public get getCollector(): Collector {
    return this.collector;
  }

  public get getName(): string {
    return this.name;
  }

  public get getDescription(): Nullable<string> {
    return this.description;
  }

  public get getPrivate(): boolean {
    return this.private;
  }

  public get getCollectionItems(): Array<CollectionItem> {
    return this.collectionItems;
  }

  public get getLatestCollectionItem(): CollectionItem {
    return this.collectionItems[this.collectionItems.length - 1];
  }

  public get getCreatedAt(): Date {
    return this.createdAt;
  }

  public get getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public get getRemovedAt(): Nullable<Date> {
    return this.removedAt;
  }

  public async edit(payload: EditCollectionEntityPayload): Promise<void> {
    const currentDate: Date = new Date();

    if (payload.name) {
      this.name = payload.name;
      this.updatedAt = currentDate;
    }
    if (payload.description) {
      this.description = payload.description;
      this.updatedAt = currentDate;
    }
    if (payload.private) {
      this.private = payload.private;
      this.updatedAt = currentDate;
    }

    await this.validate();
  }

  public async addCollectionItem(newCollectionItem: CollectionItem): Promise<void> {
    const currentDate: Date = new Date();

    // 리스트에 같은 미디어가 이미 존재하는지 확인
    const doesExist: boolean = this.collectionItems.some((collectionItem: CollectionItem) =>
      collectionItem.VerifySameMediaExist(newCollectionItem),
    );

    // 이미 존재하면 업데이트, 존재하지 않으면 리스트에 추가함
    if (doesExist === true) {
      await newCollectionItem.update();
      this.updatedAt = currentDate;
    }
    if (doesExist === false) {
      this.collectionItems = [...this.collectionItems, newCollectionItem];
      this.updatedAt = currentDate;
    }

    await this.validate();
  }

  public async remove(): Promise<void> {
    this.removedAt = new Date();
    await this.validate();
  }

  public async restore(): Promise<void> {
    this.removedAt = null;
    await this.validate();
  }
}
