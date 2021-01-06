import { IsDate, IsUUID, IsArray, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { v4 } from 'uuid';
import { Entity } from '@core/common/Entity';
import { Nullable, Optional } from '@core/common/Types';
import { CreateHistoryEntityPayload } from '@core/domain/history/entity/type/CreateHistoryEntityPayload';
import { HistoryItem } from '@core/domain/history/entity/HistoryItem';

export enum HistoryCategory {
  PLANNING = 'PLANNING',
  CURRENT = 'CURRENT',
  COMPLETED = 'COMPLETED',
}

export class History extends Entity<string> {
  @IsUUID()
  private readonly ownerId: string;

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

    this.ownerId = payload.ownerId;
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

  public get getOwnerId(): string {
    return this.ownerId;
  }

  public get getCategory(): HistoryCategory {
    return this.category;
  }

  public get getHistoryItems(): Array<HistoryItem> {
    return this.historyItems;
  }

  public get getLatestHistoryItem(): HistoryItem {
    this.sortHistoryItemByDate('LATEST');
    return this.historyItems[this.historyItems.length - 1];
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

  public async addHistoryItem(newHistoryItem: HistoryItem): Promise<void> {
    await this.checkCategoryRule(newHistoryItem);

    const doesHistoryItemExist: Optional<HistoryItem> = this.verifyHistoryItemExist(newHistoryItem);

    // 리스트에 동일한 아이템이 존재하면 갱신
    if (doesHistoryItemExist instanceof HistoryItem) {
      await doesHistoryItemExist.update();

      if (this.category === HistoryCategory.COMPLETED) {
        await doesHistoryItemExist.increaseRepeat();
      }
    }

    // 리스트에 동일한 아이템이 존재하지 않으면 리스트에 추가
    if (doesHistoryItemExist === undefined) {
      this.historyItems = [...this.historyItems, newHistoryItem];
    }

    this.updatedAt = new Date();
    await this.validate();
  }

  /**
   * 비지니스 규칙에 올바른 데이터인지 확인
   *
   * @param historyItem
   */
  private async checkCategoryRule(historyItem: HistoryItem) {
    // COMPLETED 카테고리는 FINISHED 상태인 미디어만 추가할 수 있다.
    if (this.category === HistoryCategory.COMPLETED) {
      await historyItem.addToCompleteCategory();
    }
    // CURRENT 카테고리는 FINISHED, RELEASING 상태인 미디어만 추가할 수 있다.
    if (this.category === HistoryCategory.CURRENT) {
      await historyItem.addToCurrentCategory();
    }
  }

  private verifyHistoryItemExist(historyItem: HistoryItem): Optional<HistoryItem> {
    return this.historyItems.find(item => item.verifySameMediaExist(historyItem.getMedia.getId));
  }

  private async sortHistoryItemByDate(order: 'LATEST' | 'OLD'): Promise<void> {
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
}
