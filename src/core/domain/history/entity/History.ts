import { IsInt, IsBoolean, IsDate, IsUUID, IsEnum, IsOptional } from 'class-validator';
import { Nullable } from '@core/common/Types';
import { Entity } from '@core/common/Entity';
import { HistoryStatus } from '@core/common/enums/HistoryEnums';
import { CreateHistoryEntityPayload } from '@core/domain/history/entity/type/CreateHistoryEntityPayload';
import { EditHistoryEntityPayload } from '@core/domain/history/entity/type/EditHistoryEntityPayload';

export class History extends Entity<number> {
  @IsUUID()
  private readonly userId: string;

  @IsUUID()
  private readonly mediaId: string;

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

  @IsDate()
  @IsOptional()
  private removedAt: Nullable<Date>;

  public constructor(payload: CreateHistoryEntityPayload) {
    super();

    this.id = payload.id;
    this.userId = payload.userId;
    this.mediaId = payload.mediaId;
    this.status = payload.status;

    this.repeat = payload.repeat ?? 0;
    this.secret = payload.secret ?? false;
    this.completedAt = payload.completedAt ?? new Date();
    this.createdAt = payload.createdAt ?? new Date();
    this.updatedAt = payload.updatedAt ?? new Date();
    this.removedAt = payload.removedAt ?? null;
  }

  public static async new(payload: CreateHistoryEntityPayload): Promise<History> {
    const history = new History(payload);
    await history.validate();

    return history;
  }

  public get getUserId(): string {
    return this.userId;
  }

  public get getMediaId(): string {
    return this.mediaId;
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

  public get getRemovedAt(): Nullable<Date> {
    return this.removedAt;
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

  public async remove(): Promise<void> {
    this.removedAt = new Date();
    await this.validate();
  }

  public async changeStatus(status: HistoryStatus): Promise<void> {
    const currentDate: Date = new Date();

    this.status = status;
    this.updatedAt = currentDate;

    await this.validate();
  }
}
