import { IsDate, IsArray, IsEnum, IsInstance, IsOptional, ValidateNested } from 'class-validator';
import { v4 } from 'uuid';
import { Entity } from '@core/common/Entity';
import { Nullable, Optional } from '@core/common/Types';
import { HistoryItem } from '@core/domain/history/entity/HistoryItem';
import { HistoryOwner } from '@core/domain/history/value-object/HistoryOwner';
import { CreateHistoryEntityPayload } from '@core/domain/history/entity/type/CreateHistoryEntityPayload';

export enum HistoryCategory {
  PLANNING = 'PLANNING',
  CURRENT = 'CURRENT',
  COMPLETED = 'COMPLETED',
}

export class History extends Entity<string> {
  @IsInstance(HistoryOwner)
  private readonly owner: HistoryOwner;

  @IsEnum(HistoryCategory)
  private category: HistoryCategory;

  @IsArray()
  @ValidateNested({ each: true })
  private historyItems: Array<HistoryItem>;

  @IsDate()
  private readonly createdAt: Date;

  @IsDate()
  private updatedAt: Date;

  @IsDate()
  @IsOptional()
  private removedAt: Nullable<Date>;

  public constructor(payload: CreateHistoryEntityPayload) {
    super();

    this.owner = payload.owner;
    this.category = payload.category;

    this.id = payload.id ?? v4();
    this.historyItems = payload.historyItems ?? [];
    this.createdAt = payload.createdAt ?? new Date();
    this.updatedAt = payload.updatedAt ?? new Date();
    this.removedAt = payload.removedAt ?? null;
  }

  public static async new(payload: CreateHistoryEntityPayload): Promise<History> {
    const history = new History(payload);
    await history.validate();

    return history;
  }

  public get getOwner(): HistoryOwner {
    return this.owner;
  }

  public get getCategory(): HistoryCategory {
    return this.category;
  }

  public get getHistoryItems(): Array<HistoryItem> {
    return this.historyItems;
  }

  public get getLatestHistoryItem(): HistoryItem {
    this.sortHistoryItemListByDate('LATEST');
    return this.historyItems[0];
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

  public async remove(): Promise<void> {
    this.removedAt = new Date();
    await this.validate();
  }

  public async restore(): Promise<void> {
    this.removedAt = null;
    await this.validate();
  }

  public async sortHistoryItemListByDate(order: 'LATEST' | 'OLD'): Promise<void> {
    this.historyItems.sort((a, b) => {
      const timeA = a.getUpdatedAt.getTime();
      const timeB = b.getUpdatedAt.getTime();

      if (order === 'LATEST') {
        return timeB - timeA;
      }
      if (order === 'OLD') {
        return timeA - timeB;
      }

      return 0;
    });

    await this.validate();
  }

  public async addHistoryItem(newHistoryItem: HistoryItem, condition?: () => void): Promise<void> {
    const currentDate: Date = new Date();

    const doesHistoryItemExist: Optional<HistoryItem> = this.verifyHistoryItemExist(newHistoryItem);

    // 리스트에 동일한 아이템이 존재하면 업데이트
    if (doesHistoryItemExist instanceof HistoryItem) {
      if (condition) condition();

      await doesHistoryItemExist.update();
      this.updatedAt = currentDate;
    }
    // 리스트에 동일한 아이템이 존재하지 않으면 리스트에 추가
    if (doesHistoryItemExist === undefined) {
      this.historyItems = [...this.historyItems, newHistoryItem];
      this.updatedAt = currentDate;
    }

    await this.validate();
  }

  private verifyHistoryItemExist(historyItem: HistoryItem): Optional<HistoryItem> {
    return this.historyItems.filter(item => item.verifySameMediaExist(historyItem.getMediaId))[0];
  }
}
