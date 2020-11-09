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

  public async create(userId: string, library: Library): Promise<Library> {
    const libraryOrm: PrismaLibrary = LibraryMapper.toOrmEntity(library);
    const newLibrary: PrismaLibrary = await this.library.create({
      data: {
        user: { connect: { id: userId } },
        name: libraryOrm.name,
        description: libraryOrm.description,
        private: libraryOrm.private,
      },
    });
    const libraryDomain: Library = LibraryMapper.toDomainEntity(newLibrary);

    return libraryDomain;
  }

  public async update(library: Library): Promise<Library> {
    const libraryOrm: PrismaLibrary = LibraryMapper.toOrmEntity(library);
    const updateLibrary: PrismaLibrary = await this.library.update({
      where: { id: libraryOrm.id },
      data: libraryOrm,
    });
    const libraryDomain: Library = LibraryMapper.toDomainEntity(updateLibrary);

    return libraryDomain;
  }
}
