import { Nullable } from '@core/common/Types';
import { LibraryRepositoryArgs } from '@core/common/persistence/RepositoryArgs';
import { Library } from '@core/domain/library/entity/Library';

export interface LibraryRepositoryPort {
  findOne(args: LibraryRepositoryArgs.FindOne): Promise<Nullable<Library>>;

  findMany(args?: LibraryRepositoryArgs.FindMany): Promise<Library[]>;

  count(args?: LibraryRepositoryArgs.FindMany): Promise<number>;

  create(library: Library): Promise<Library>;

  update(library: Library): Promise<Library>;

  delete(library: Library): Promise<Library>;
}
