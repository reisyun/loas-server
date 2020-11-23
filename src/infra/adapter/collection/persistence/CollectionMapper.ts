import { MediaCollection as PrismaCollection } from '@prisma/client';
import { Collection } from '@core/domain/collection/entity/Collection';

export class CollectionMapper {
  public static toOrmEntity(domain: Collection): PrismaCollection {
    const orm: PrismaCollection = {
      id: domain.getId,
      userId: domain.getUserId,
      name: domain.getName,
      description: domain.getDescription,
      isCustom: domain.getIsCustom,
      createdAt: domain.getCreatedAt,
      updatedAt: domain.getUpdatedAt,
      removedAt: domain.getRemovedAt,
    };

    return orm;
  }

  public static toOrmEntities(domains: Collection[]): PrismaCollection[] {
    return domains.map(orm => this.toOrmEntity(orm));
  }

  public static toDomainEntity(orm: PrismaCollection): Collection {
    const domain: Collection = new Collection({
      id: orm.id,
      userId: orm.userId,
      name: orm.name,
      description: orm.description as string,
      isCustom: orm.isCustom,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      removedAt: orm.removedAt as Date,
    });

    return domain;
  }

  public static toDomainEntities(orms: PrismaCollection[]): Collection[] {
    return orms.map(orm => this.toDomainEntity(orm));
  }
}
