import { Exclude, Expose, plainToClass } from 'class-transformer';
import { Library } from '@core/domain/library/entity/Library';

@Exclude()
export class LibraryUseCaseDto {
  @Expose()
  public id!: number;

  @Expose()
  public userId!: string;

  @Expose()
  public name!: string;

  @Expose()
  public description?: string;

  @Expose()
  public private!: boolean;

  @Expose()
  public isCustom!: boolean;

  @Expose()
  public createdAt!: Date;

  @Expose()
  public updatedAt!: Date;

  @Expose()
  public removedAt?: Date;

  public static newFromLibrary(library: Library): LibraryUseCaseDto {
    const dto: LibraryUseCaseDto = plainToClass(LibraryUseCaseDto, library);
    return dto;
  }

  public static newListFromLibraries(libraries: Library[]): LibraryUseCaseDto[] {
    return libraries.map(library => this.newFromLibrary(library));
  }
}
