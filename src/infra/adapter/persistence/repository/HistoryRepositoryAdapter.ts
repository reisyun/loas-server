import { Nullable } from '@core/common/Types';
import { HistoryRepositoryArgs } from '@core/common/persistence/RepositoryArgs';
import { History } from '@core/domain/history/entity/History';
import { HistoryRepositoryPort } from '@core/domain/history/port/persistence/HistoryRepositoryPort';
import { PrismaRepository } from '@infra/adapter/persistence/PrismaRepository';
import { PrismaHistory } from '@infra/adapter/persistence/entity/PrismaHistory';
import { HistoryMapper } from '@infra/adapter/persistence/mapper/HistoryMapper';

export class HistoryRepositoryAdapter extends PrismaRepository implements HistoryRepositoryPort {
  public async findOne(args: HistoryRepositoryArgs.FindOne): Promise<Nullable<History>> {
    let historyDomain: Nullable<History> = null;
    const history: Nullable<PrismaHistory> = await this.history.findUnique({
      ...args,
    });
    if (history) {
      historyDomain = HistoryMapper.toDomainEntity(history);
    }

    return historyDomain;
  }

  public async findMany(args?: HistoryRepositoryArgs.FindMany): Promise<History[]> {
    const historys: PrismaHistory[] = await this.history.findMany({
      ...args,
    });
    const historysDomain: History[] = HistoryMapper.toDomainEntities(historys);

    return historysDomain;
  }

  public async count(args?: HistoryRepositoryArgs.FindMany): Promise<number> {
    const countHistory: number = await this.history.count(args);

    return countHistory;
  }

  public async create(history: History): Promise<void> {
    await this.history.create({
      data: {
        id: history.getId,
        status: history.getStatus,
        repeat: history.getRepeat,
        secret: history.getSecret,
        completedAt: history.getCompletedAt,

        user: { connect: { id: history.getOwnerId } },
        media: { connect: { id: history.getMedia.getId } },
      },
    });
  }

  public async update(history: History): Promise<void> {
    await this.history.update({
      where: { id: history.getId },
      data: {
        status: history.getStatus,
        repeat: history.getRepeat,
        secret: history.getSecret,
        completedAt: history.getCompletedAt,
      },
    });
  }

  public async delete(history: History): Promise<void> {
    await this.history.delete({
      where: { id: history.getId },
    });
  }
}
