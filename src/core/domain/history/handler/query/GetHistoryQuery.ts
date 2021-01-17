import { HistoryCategory } from '@core/common/enums/HistoryEnums';

type GetHistoryQueryPayload = {
  ownerId: string;
  category: HistoryCategory;
};

export class GetHistoryQuery {
  public readonly where: GetHistoryQueryPayload;

  private constructor(where: GetHistoryQueryPayload) {
    this.where = where;
  }

  public static new(where: GetHistoryQueryPayload): GetHistoryQuery {
    return new GetHistoryQuery(where);
  }
}
