import { Nullable } from '@core/common/Types';
import { HistoryItemRepositoryArgs } from '@core/common/persistence/RepositoryArgs';
import { HistoryItem } from '@core/domain/historyItem/entity/HistoryItem';
import { HistoryItemRepositoryPort } from '@core/domain/historyItem/port/persistence/HistoryItemRepositoryPort';
import { PrismaRepository } from '@infra/adapter/persistence/PrismaRepository';
import { PrismaHistoryItem } from '@infra/adapter/persistence/entity/PrismaHistoryItem';
import { HistoryItemMapper } from '@infra/adapter/persistence/mapper/HistoryItemMapper';

export class HistoryItemRepositoryAdapter
  extends PrismaRepository
  implements HistoryItemRepositoryPort {
  public async findOne(args: HistoryItemRepositoryArgs.FindOne): Promise<Nullable<HistoryItem>> {
    let historyDomain: Nullable<HistoryItem> = null;
    const historyItem: Nullable<PrismaHistoryItem> = await this.historyItem.findUnique({
      ...args,
      include: {
        history: { select: { ownerId: true, category: true } },
        media: { select: { status: true } },
      },
    });
    if (historyItem) {
      historyDomain = HistoryItemMapper.toDomainEntity(historyItem);
    }

    return historyDomain;
  }

  public async findMany(args?: HistoryItemRepositoryArgs.FindMany): Promise<HistoryItem[]> {
    const historys: PrismaHistoryItem[] = await this.historyItem.findMany({
      ...args,
      include: {
        history: { select: { ownerId: true, category: true } },
        media: { select: { status: true } },
      },
    });
    const historysDomain: HistoryItem[] = HistoryItemMapper.toDomainEntities(historys);

    return historysDomain;
  }

  public async count(args?: HistoryItemRepositoryArgs.FindMany): Promise<number> {
    const countHistoryItem: number = await this.historyItem.count(args);

    return countHistoryItem;
  }

  public async create(historyItem: HistoryItem): Promise<void> {
    await this.historyItem.create({
      data: {
        id: historyItem.getId,
        repeat: historyItem.getRepeat,
        private: historyItem.getPrivate,
        completedAt: historyItem.getCompletedAt,
        createdAt: historyItem.getCreatedAt,

        history: { connect: { id: historyItem.getHistory.getId } },
        media: { connect: { id: historyItem.getMedia.getId } },
      },
    });
  }

  public async update(historyItem: HistoryItem): Promise<void> {
    await this.historyItem.update({
      where: { id: historyItem.getId },
      data: {
        repeat: historyItem.getRepeat,
        private: historyItem.getPrivate,
        completedAt: historyItem.getCompletedAt,
        updatedAt: historyItem.getUpdatedAt,
      },
    });
  }

  public async remove(historyItem: HistoryItem): Promise<void> {
    await this.historyItem.update({
      where: { id: historyItem.getId },
      data: { removedAt: historyItem.getRemovedAt },
    });
  }
}
