import { Library as PrismaLibrary } from '@prisma/client';
import { Nullable } from '@core/common/Types';
import { LibraryRepositoryArgs } from '@core/common/persistence/RepositoryArgs';
import { Library } from '@core/domain/library/entity/Library';
import { LibraryRepositoryPort } from '@core/domain/library/port/persistence/LibraryRepositoryPort';
import { PrismaRepository } from '@infra/adapter/common/PrismaRepository';
import { LibraryMapper } from '@infra/adapter/library/persistence/LibraryMapper';

export class LibraryRepositoryAdapter extends PrismaRepository implements LibraryRepositoryPort {
  public async findOne(args: LibraryRepositoryArgs.FindOne): Promise<Nullable<Library>> {
    let libraryDomain: Nullable<Library> = null;
    const library: Nullable<PrismaLibrary> = await this.library.findOne(args);
    if (library) {
      libraryDomain = LibraryMapper.toDomainEntity(library);
    }

    return libraryDomain;
  }

  public async findMany(args?: LibraryRepositoryArgs.FindMany): Promise<Library[]> {
    const libraries: Nullable<PrismaLibrary[]> = await this.library.findMany(args);
    const librariesDomain: Library[] = LibraryMapper.toDomainEntities(libraries);

    return librariesDomain;
  }

  public async count(args?: LibraryRepositoryArgs.FindMany): Promise<number> {
    const countLibrary: number = await this.library.count(args);

    return countLibrary;
  }

  public async create(library: Library): Promise<Library> {
    const newLibrary: PrismaLibrary = await this.library.create({
      data: {
        id: library.getId,
        name: library.getName,
        description: library.getDescription,
        private: library.getPrivate,
        isCustom: library.getIsCustom,
        user: { connect: { id: library.getUserId } },
      },
    });
    const libraryDomain: Library = LibraryMapper.toDomainEntity(newLibrary);

    return libraryDomain;
  }

  public async update(library: Library): Promise<Library> {
    const updateLibrary: PrismaLibrary = await this.library.update({
      where: { id: library.getId },
      data: {
        name: library.getName,
        description: library.getDescription,
        private: library.getPrivate,
        // soft delete
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
