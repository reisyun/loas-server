import { IsUUID, IsEnum } from 'class-validator';
import { ValueObject } from '@core/common/ValueObject';
import { MediaStatus } from '@core/common/enums/MediaEnums';

export class Media extends ValueObject {
  @IsUUID()
  private readonly mediaId: string;

  @IsEnum(MediaStatus)
  private readonly status: MediaStatus;

  public constructor(mediaId: string, status?: MediaStatus) {
    super();

    this.mediaId = mediaId;
    // TODO: 상태는 외부에서 가져오도록 하기
    this.status = status ?? MediaStatus.CANCELLED;
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
