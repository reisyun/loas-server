import { IsInt, IsBoolean, IsDate, IsUUID, IsEnum, IsInstance } from 'class-validator';
import { v4 } from 'uuid';
import { Entity } from '@core/common/Entity';
import { HistoryStatus } from '@core/common/enums/HistoryEnums';
import { CreateHistoryEntityPayload } from '@core/domain/history/entity/type/CreateHistoryEntityPayload';
import { EditHistoryEntityPayload } from '@core/domain/history/entity/type/EditHistoryEntityPayload';
import { Media } from '@core/domain/history/value-object/Media';

export class History extends Entity<string> {
  @IsUUID()
  private readonly ownerId: string;

  @IsInstance(Media)
  private readonly media: Media;

  @IsEnum(HistoryStatus)
  private status: HistoryStatus;

  @IsInt()
  private repeat: number;

  @IsBoolean()
  private secret: boolean;

  @IsDate()
  private completedAt: Date;

  @IsDate()
  private readonly createdAt: Date;

  @IsDate()
  private updatedAt: Date;

  public constructor(payload: CreateHistoryEntityPayload) {
    super();

    this.ownerId = payload.ownerId;
    this.media = payload.media;
    this.status = payload.status;

    this.repeat = payload.repeat ?? 0;
    this.secret = payload.secret ?? false;
    this.completedAt = payload.completedAt ?? new Date();

    this.id = payload.id ?? v4();
    this.createdAt = payload.createdAt ?? new Date();
    this.updatedAt = payload.updatedAt ?? new Date();
  }

  public static async new(payload: CreateHistoryEntityPayload): Promise<History> {
    const history = new History(payload);
    await history.validate();

    return history;
  }

  public get getOwnerId(): string {
    return this.ownerId;
  }

  public get getMedia(): Media {
    return this.media;
  }

  public get getStatus(): HistoryStatus {
    return this.status;
  }

  public get getRepeat(): number {
    return this.repeat;
  }

  public get getSecret(): boolean {
    return this.secret;
  }

  public get getCompletedAt(): Date {
    return this.completedAt;
  }

  public get getCreatedAt(): Date {
    return this.createdAt;
  }

  public get getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public async edit(payload: EditHistoryEntityPayload): Promise<void> {
    const currentDate: Date = new Date();

    if (payload.repeat) {
      this.repeat = payload.repeat;
      this.updatedAt = currentDate;
    }
    if (payload.secret) {
      this.secret = payload.secret;
      this.updatedAt = currentDate;
    }
    if (payload.completedAt) {
      this.completedAt = payload.completedAt;
      this.updatedAt = currentDate;
    }

    await this.validate();
  }

  public async changeStatus(status: HistoryStatus): Promise<void> {
    this.status = status;
    this.updatedAt = new Date();

    await this.validate();
  }
}
