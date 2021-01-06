import { Nullable } from '@core/common/Types';
import { HistoryRepositoryArgs } from '@core/common/persistence/RepositoryArgs';
import { History } from '@core/domain/history/entity/History';
import { HistoryItem } from '@core/domain/history/entity/HistoryItem';
import { HistoryRepositoryPort } from '@core/domain/history/port/persistence/HistoryRepositoryPort';
import { PrismaRepository } from '@infra/adapter/persistence/PrismaRepository';
import { PrismaHistory } from '@infra/adapter/persistence/entity/PrismaHistory';
import { HistoryMapper } from '@infra/adapter/persistence/mapper/HistoryMapper';

export class HistoryRepositoryAdapter extends PrismaRepository implements HistoryRepositoryPort {
  public async findOne(args: HistoryRepositoryArgs.FindOne): Promise<Nullable<History>> {
    let historyDomain: Nullable<History> = null;
    const history: Nullable<PrismaHistory> = await this.history.findUnique({
      ...args,
      include: { historyItems: true },
    });
    if (history) {
      historyDomain = HistoryMapper.toDomainEntity(history);
    }

    return historyDomain;
  }

  public async findMany(args?: HistoryRepositoryArgs.FindMany): Promise<History[]> {
    const historys: PrismaHistory[] = await this.history.findMany({
      ...args,
      include: { historyItems: true },
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
        category: history.getCategory,

        owner: {
          connect: { id: history.getOwnerId },
        },
      },
    });
  }

  public async update(history: History): Promise<void> {
    const historyItem = history.getLatestHistoryItem;

    await this.history.update({
      where: { id: history.getId },
      data: {
        updatedAt: history.getUpdatedAt,

        historyItems: {
          upsert: {
            where: { id: historyItem.getId },
            create: {
              id: historyItem.getId,
              media: { connect: { id: historyItem.getMedia.getId } },
            },
            update: {
              repeat: historyItem.getRepeat,
              private: historyItem.getPrivate,
              completedAt: historyItem.getCompletedAt,
              updatedAt: historyItem.getUpdatedAt,
            },
          },
        },
      },
    });
  }

  public async remove(domain: History | HistoryItem): Promise<void> {
    if (domain instanceof History) {
      await this.history.update({
        where: { id: domain.getId },
        data: { removedAt: domain.getRemovedAt },
      });
    }
    if (domain instanceof HistoryItem) {
      await this.historyItem.update({
        where: { id: domain.getId },
        data: { removedAt: domain.getRemovedAt },
      });
    }
  }
}
