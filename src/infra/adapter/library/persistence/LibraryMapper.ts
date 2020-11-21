import { Library as PrismaLibrary } from '@prisma/client';
import { Library } from '@core/domain/library/entity/Library';

export class LibraryMapper {
  public static toOrmEntity(domain: Library): PrismaLibrary {
    const orm: PrismaLibrary = {
      id: domain.getId,
      userId: domain.getUserId,
      name: domain.getName,
      description: domain.getDescription,
      private: domain.getPrivate,
      isCustom: domain.getIsCustom,
      createdAt: domain.getCreatedAt,
      updatedAt: domain.getUpdatedAt,
      removedAt: domain.getRemovedAt,
    };

    return orm;
  }

  public static toOrmEntities(domains: Library[]): PrismaLibrary[] {
    return domains.map(orm => this.toOrmEntity(orm));
  }

  public static toDomainEntity(orm: PrismaLibrary): Library {
    const domain: Library = new Library({
      id: orm.id,
      userId: orm.userId,
      name: orm.name,
      description: orm.description as string,
      private: orm.private,
      isCustom: orm.isCustom,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      removedAt: orm.removedAt as Date,
    });

    return domain;
  }

  public static toDomainEntities(orms: PrismaLibrary[]): Library[] {
    return orms.map(orm => this.toDomainEntity(orm));
  }
}
