import { IsInt, IsUUID, IsDate, IsOptional, IsBoolean } from 'class-validator';
import { v4 } from 'uuid';
import { Entity } from '@core/common/Entity';
import { Nullable } from '@core/common/Types';
import { CreateCollectionItemEntityPayload } from '@core/domain/collectionItem/entity/type/CreateCollectionItemEntityPayload';
import { EditCollectionItemEntityPayload } from '@core/domain/collectionItem/entity/type/EditCollectionItemEntityPayload';
import { Collection } from '@core/domain/collectionItem/value-object/Collection';

export class CollectionItem extends Entity<string> {
  @IsUUID()
  private collection: Collection;

  // @IsInt()
  // private readonly mediaId: number;

  @IsBoolean()
  private private: boolean;

  @IsDate()
  private completedAt: Date;

  @IsBoolean()
  @IsOptional()
  private like: Nullable<boolean>;

  @IsInt()
  private repeat: number;

  @IsDate()
  private readonly createdAt: Date;

  @IsDate()
  private updatedAt: Date;

  public constructor(payload: CreateCollectionItemEntityPayload) {
    super();

    this.collection = payload.collection;

    this.id = payload.id ?? v4();
    this.like = payload.like ?? null;
    this.private = payload.private ?? false;
    this.repeat = payload.repeat ?? 0;
    this.completedAt = payload.completedAt ?? new Date();
    this.createdAt = payload.createdAt ?? new Date();
    this.updatedAt = payload.updatedAt ?? new Date();
  }

  public static async new(payload: CreateCollectionItemEntityPayload): Promise<CollectionItem> {
    const collection = new CollectionItem(payload);
    await collection.validate();

    return collection;
  }

  public get getCollection(): Collection {
    return this.collection;
  }

  public get getPrivate(): boolean {
    return this.private;
  }

  public get getCompletedAt(): Date {
    return this.completedAt;
  }

  public get getLike(): Nullable<boolean> {
    return this.like;
  }

  public get getRepeat(): number {
    return this.repeat;
  }

  public get getCreatedAt(): Date {
    return this.createdAt;
  }

  public get getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public async edit(payload: EditCollectionItemEntityPayload): Promise<void> {
    const currentDate: Date = new Date();

    if (payload.like) {
      this.like = payload.like;
      this.updatedAt = currentDate;
    }
    if (payload.private) {
      this.private = payload.private;
      this.updatedAt = currentDate;
    }
    if (payload.repeat) {
      this.repeat = payload.repeat;
      this.updatedAt = currentDate;
    }
    if (payload.completedAt) {
      this.completedAt = payload.completedAt;
      this.updatedAt = currentDate;
    }

    await this.validate();
  }

  public async changeCollection(collection: Collection): Promise<void> {
    const currentDate: Date = new Date();

    this.collection = collection;
    this.updatedAt = currentDate;

    await this.validate();
  }
}
