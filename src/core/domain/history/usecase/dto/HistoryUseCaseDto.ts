import { Exclude, Expose, plainToClass } from 'class-transformer';
import { Nullable } from '@core/common/Types';
import { HistoryStatus } from '@core/common/enums/HistoryEnums';
import { History } from '@core/domain/history/entity/History';

@Exclude()
export class HistoryUseCaseDto {
  @Expose()
  public userId!: string;

  @Expose()
  public mediaId!: string;

  @Expose()
  public status!: HistoryStatus;

  @Expose()
  public repeat!: number;

  @Expose()
  public secret!: boolean;

  @Expose()
  public completedAt!: Date;

  public id!: number;

  public createdAt!: Date;

  public updatedAt!: Date;

  public removedAt!: Nullable<Date>;

  public static newFromHistory(history: History): HistoryUseCaseDto {
    const dto: HistoryUseCaseDto = plainToClass(HistoryUseCaseDto, history);

    return dto;
  }

  public static newListFromHistories(histories: History[]): HistoryUseCaseDto[] {
    return histories.map(history => this.newFromHistory(history));
  }
}
