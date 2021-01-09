import { IsUUID, IsEnum } from 'class-validator';
import { ValueObject } from '@core/common/ValueObject';

export enum MediaStatus {
  RELEASING = 'RELEASING',
  FINISHED = 'FINISHED',
  UNRELEASED = 'UNRELEASED',
  CANCELLED = 'CANCELLED',
}

export class Media extends ValueObject {
  @IsUUID()
  private readonly mediaId: string;

  @IsEnum(MediaStatus)
  private readonly status: MediaStatus;

  public constructor(mediaId: string, status?: MediaStatus) {
    super();

    this.mediaId = mediaId;
    this.status = status ?? MediaStatus.FINISHED;
  }

  public static async new(mediaId: string, status?: MediaStatus): Promise<Media> {
    const media = new Media(mediaId, status);
    await media.validate();

    return media;
  }

  public get getId(): string {
    return this.mediaId;
  }

  public get getStatus(): MediaStatus {
    return this.status;
  }
}
