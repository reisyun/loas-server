import { IsUUID, IsEnum } from 'class-validator';
import { Entity } from '@core/common/Entity';

export enum HistoryCategory {
  PLANNING = 'PLANNING',
  CURRENT = 'CURRENT',
  COMPLETED = 'COMPLETED',
}

export class History extends Entity<string> {
  @IsUUID()
  private ownerId: string;

  @IsEnum(HistoryCategory)
  private category: HistoryCategory;

  public constructor(ownerId: string, category: HistoryCategory) {
    super();

    this.ownerId = ownerId
    this.category = category;
  }

  public static async new(ownerId: string, category: HistoryCategory): Promise<History> {
    const history = new History(ownerId, category);
    await history.validate();

    return history;
  }

  public get getOwnerId(): string {
    return this.ownerId;
  }

  public get getCategory(): HistoryCategory {
    return this.category;
  }
}
