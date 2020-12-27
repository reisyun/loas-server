import { IsDate, IsUUID } from 'class-validator';
import { ValueObject } from '@core/common/ValueObject';
import { CreateCollectionItemValueObjectPayload } from '@core/domain/collection/value-object/type/CreateCollectionItemValueObjectPayload';

export class CollectionItem extends ValueObject {
  @IsUUID()
  private readonly mediaId: string;

  @IsDate()
  private readonly createdAt: Date;

  @IsDate()
  private updatedAt: Date;

  public constructor(mediaId: string, createdAt?: Date, updatedAt?: Date) {
    super();

    this.mediaId = mediaId;

    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }

  public static async new(
    payload: CreateCollectionItemValueObjectPayload,
  ): Promise<CollectionItem> {
    const collectionItem = new CollectionItem(
      payload.mediaId,
      payload.createdAt,
      payload.updatedAt,
    );
    await collectionItem.validate();

    return collectionItem;
  }

  public get getMediaId(): string {
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
