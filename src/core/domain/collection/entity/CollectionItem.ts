import { IsInt, IsDate } from 'class-validator';
import { v4 } from 'uuid';
import { Entity } from '@core/common/Entity';
import { CreateCollectionItemEntityPayload } from '@core/domain/collection/entity/type/CreateCollectionItemEntityPayload';

export class CollectionItem extends Entity<string> {
  @IsInt()
  private readonly mediaId: number;

  @IsDate()
  private readonly createdAt: Date;

  @IsDate()
  private updatedAt: Date;

  public constructor(mediaId: number, id?: string, createdAt?: Date, updatedAt?: Date) {
    super();

    this.mediaId = mediaId;

    this.id = id ?? v4();
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }

  public static async new(payload: CreateCollectionItemEntityPayload): Promise<CollectionItem> {
    const collectionItem = new CollectionItem(
      payload.mediaId,
      payload.id,
      payload.createdAt,
      payload.updatedAt,
    );
    await collectionItem.validate();

    return collectionItem;
  }

  public get getMediaId(): number {
    return this.mediaId;
  }

  public get getCreatedAt(): Date {
    return this.createdAt;
  }

  public get getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public VerifySameMediaExist(collectionItem: CollectionItem): boolean {
    return this.mediaId === collectionItem.getMediaId;
  }

  public async update() {
    this.updatedAt = new Date();
    await this.validate();
  }
}
