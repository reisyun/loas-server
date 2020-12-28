import { Exclude, Expose, plainToClass } from 'class-transformer';
import { Nullable } from '@core/common/Types';
import { History, Category } from '@core/domain/history/entity/History';
import { HistoryOwner } from '@core/domain/history/value-object/HistoryOwner';

@Exclude()
export class HistoryUseCaseDto {
  @Expose()
  public id!: string;

  @Expose()
  public category!: Category;

  public createdAt!: Date;

  public updatedAt!: Date;

  public removedAt!: Nullable<Date>;

  @Expose()
  public owner!: {
    id: string;
    name: string;
  };

  public static newFromHistory(history: History): HistoryUseCaseDto {
    const dto: HistoryUseCaseDto = plainToClass(HistoryUseCaseDto, history);
    const owner: HistoryOwner = history.getOwner;

    dto.owner = {
      id: owner.getId,
      name: owner.getName,
    };

    return dto;
  }

  public static newListFromHistories(histories: History[]): HistoryUseCaseDto[] {
    return histories.map(history => this.newFromHistory(history));
  }
}
