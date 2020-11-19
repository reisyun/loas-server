import { Library as PrismaLibrary } from '@prisma/client';
import { Library } from '@core/domain/library/entity/Library';

export class LibraryMapper {
  public static toOrmEntity(libraryDomain: Library): PrismaLibrary {
    const libraryOrm: PrismaLibrary = {
      id: libraryDomain.getId,
      userId: libraryDomain.getUserId,
      name: libraryDomain.getName,
      description: libraryDomain.getDescription,
      private: libraryDomain.getPrivate,
      isCustom: libraryDomain.getIsCustom,
      createdAt: libraryDomain.getCreatedAt,
      updatedAt: libraryDomain.getUpdatedAt,
      removedAt: libraryDomain.getRemovedAt,
    };

    return libraryOrm;
  }

  public static toOrmEntities(librariesDomain: Library[]): PrismaLibrary[] {
    return librariesDomain.map(libraryOrm => this.toOrmEntity(libraryOrm));
  }

  public static toDomainEntity(libraryOrm: PrismaLibrary): Library {
    const libraryDomain: Library = new Library({
      id: libraryOrm.id,
      userId: libraryOrm.userId,
      name: libraryOrm.name,
      description: libraryOrm.description as string,
      private: libraryOrm.private,
      isCustom: libraryOrm.isCustom,
      createdAt: libraryOrm.createdAt,
      updatedAt: libraryOrm.updatedAt,
      removedAt: libraryOrm.removedAt as Date,
    });

    return libraryDomain;
  }

  public static toDomainEntities(librariesOrm: PrismaLibrary[]): Library[] {
    return librariesOrm.map(libraryOrm => this.toDomainEntity(libraryOrm));
  }
}
