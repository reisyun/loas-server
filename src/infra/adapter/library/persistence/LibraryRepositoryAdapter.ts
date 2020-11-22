import { Library as PrismaLibrary } from '@prisma/client';
import { Nullable } from '@core/common/Types';
import { RepositoryFindManyOptions } from '@core/common/persistence/RepositoryOptions';
import { Library } from '@core/domain/library/entity/Library';
import {
  LibraryRepositoryPort,
  LibraryWhereInput,
} from '@core/domain/library/port/persistence/LibraryRepositoryPort';
import { PrismaRepository } from '@infra/adapter/common/PrismaRepository';
import { LibraryMapper } from '@infra/adapter/library/persistence/LibraryMapper';

export class LibraryRepositoryAdapter extends PrismaRepository implements LibraryRepositoryPort {
  public async findOne(where: LibraryWhereInput): Promise<Nullable<Library>> {
    let libraryDomain: Nullable<Library> = null;
    const library: Nullable<PrismaLibrary> = await this.library.findOne({ where });
    if (library) {
      libraryDomain = LibraryMapper.toDomainEntity(library);
    }

    return libraryDomain;
  }

  public async findMany(
    where?: LibraryWhereInput & { name?: string },
    options?: RepositoryFindManyOptions<string>,
  ): Promise<Library[]> {
    const libraries: Nullable<PrismaLibrary[]> = await this.library.findMany({ where, ...options });
    const librariesDomain: Library[] = LibraryMapper.toDomainEntities(libraries);

    return librariesDomain;
  }

  public async count(
    where?: LibraryWhereInput,
    options?: RepositoryFindManyOptions<string>,
  ): Promise<number> {
    const countLibrary: number = await this.library.count({ where, ...options });

    return countLibrary;
  }

  public async create(library: Library): Promise<Library> {
    const newLibrary: PrismaLibrary = await this.library.create({
      data: {
        user: { connect: { id: library.getUserId } },
        name: library.getName,
        description: library.getDescription,
        private: library.getPrivate,
        isCustom: library.getIsCustom,
      },
    });
    const libraryDomain: Library = LibraryMapper.toDomainEntity(newLibrary);

    return libraryDomain;
  }

  public async update(library: Library): Promise<Library> {
    const updateLibrary: PrismaLibrary = await this.library.update({
      where: { id: library.getId },
      data: {
        id: library.getId,
        name: library.getName,
        description: library.getDescription,
        private: library.getPrivate,
        isCustom: library.getIsCustom,
        createdAt: library.getCreatedAt,
        updatedAt: library.getUpdatedAt,
        removedAt: library.getRemovedAt,
      },
    });
    const libraryDomain: Library = LibraryMapper.toDomainEntity(updateLibrary);

    return libraryDomain;
  }

  public async delete(library: Library): Promise<Library> {
    const deleteLibrary: PrismaLibrary = await this.library.delete({
      where: {
        id: library.getId,
        userId: library.getUserId,
      },
    });
    const libraryDomain: Library = LibraryMapper.toDomainEntity(deleteLibrary);

    return libraryDomain;
  }
}
