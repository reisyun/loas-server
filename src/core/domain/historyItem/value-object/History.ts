import { IsUUID, IsEnum } from 'class-validator';
import { ValueObject } from '@core/common/ValueObject';
import { HistoryCategory } from '@core/common/enums/HistoryEnums';

export class History extends ValueObject {
  @IsUUID()
  private id: string;

  @IsEnum(HistoryCategory)
  private category: HistoryCategory;

  public constructor(id: string, category: HistoryCategory) {
    super();

    this.id = id;
    this.category = category;
  }

  public static async new(id: string, category: HistoryCategory): Promise<History> {
    const history = new History(id, category);
    await history.validate();

    return history;
  }

  public get getId(): string {
    return this.id;
  }

  public get getCategory(): HistoryCategory {
    return this.category;
  }
}
