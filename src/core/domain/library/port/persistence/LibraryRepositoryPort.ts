import { Nullable } from '@core/common/Types';
import { RepositoryFindManyOptions } from '@core/common/persistence/RepositoryOptions';
import { Library } from '@core/domain/library/entity/Library';

export type LibraryWhereInput = {
  id?: string;
  userId?: string;
};

export interface LibraryRepositoryPort {
  findOne(where: LibraryWhereInput): Promise<Nullable<Library>>;

  findMany(
    where?: LibraryWhereInput,
    options?: RepositoryFindManyOptions<string>,
  ): Promise<Library[]>;

  count(where?: LibraryWhereInput, options?: RepositoryFindManyOptions<string>): Promise<number>;

  create(library: Library): Promise<Library>;

  update(library: Library): Promise<Library>;

  delete(library: Library): Promise<Library>;
}
