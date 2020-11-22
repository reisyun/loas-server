import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { LibraryUseCaseDto } from '@core/domain/library/usecase/dto/LibraryUseCaseDto';
import { LibraryToken } from '@app/token/LibraryToken';
import { LibraryModel } from '@app/api/graphql/model/LibraryModel';

import { GetLibraryUseCase } from '@core/domain/library/usecase/GetLibraryUseCase';
import { GetLibraryArgs } from '@app/api/graphql/resolver/library/dto/GetLibraryArgs';
import { GetLibraryAdapter } from '@infra/adapter/library/usecase/GetLibraryAdapter';

import { CreateLibraryUseCase } from '@core/domain/library/usecase/CreateLibraryUseCase';
import { CreateLibraryArgs } from '@app/api/graphql/resolver/library/dto/CreateLibraryArgs';
import { CreateLibraryAdapter } from '@infra/adapter/library/usecase/CreateLibraryAdapter';

import { EditLibraryUseCase } from '@core/domain/library/usecase/EditLibraryUseCase';
import { EditLibraryArgs } from '@app/api/graphql/resolver/library/dto/EditLibraryArgs';
import { EditLibraryAdapter } from '@infra/adapter/library/usecase/EditLibraryAdapter';

import { RemoveLibraryUseCase } from '@core/domain/library/usecase/RemoveLibraryUseCase';
import { RemoveLibraryArgs } from '@app/api/graphql/resolver/library/dto/RemoveLibraryArgs';
import { RemoveLibraryAdapter } from '@infra/adapter/library/usecase/RemoveLibraryAdapter';

import { RestoreLibraryUseCase } from '@core/domain/library/usecase/RestoreLibraryUseCase';
import { RestoreLibraryArgs } from '@app/api/graphql/resolver/library/dto/RestoreLibraryArgs';
import { RestoreLibraryAdapter } from '@infra/adapter/library/usecase/RestoreLibraryAdapter';

/**
 * 라이브러리 관련 리졸버
 */
@Resolver(() => LibraryModel)
export class LibraryResolver {
  private readonly getLibraryUseCase: GetLibraryUseCase;

  private readonly createLibraryUseCase: CreateLibraryUseCase;

  private readonly editLibraryUseCase: EditLibraryUseCase;

  private readonly removeLibraryUseCase: RemoveLibraryUseCase;

  private readonly restoreLibraryUseCase: RestoreLibraryUseCase;

  public constructor(
    @Inject(LibraryToken.GetLibraryUseCase) getLibraryUseCase: GetLibraryUseCase,
    @Inject(LibraryToken.CreateLibraryUseCase) createLibraryUseCase: CreateLibraryUseCase,
    @Inject(LibraryToken.EditLibraryUseCase) editLibraryUseCase: EditLibraryUseCase,
    @Inject(LibraryToken.RemoveLibraryUseCase) removeLibraryUseCase: RemoveLibraryUseCase,
    @Inject(LibraryToken.RestoreLibraryUseCase) restoreLibraryUseCase: RestoreLibraryUseCase,
  ) {
    this.getLibraryUseCase = getLibraryUseCase;
    this.createLibraryUseCase = createLibraryUseCase;
    this.editLibraryUseCase = editLibraryUseCase;
    this.removeLibraryUseCase = removeLibraryUseCase;
    this.restoreLibraryUseCase = restoreLibraryUseCase;
  }

  @Query(() => LibraryModel, { name: 'GetLibrary' })
  public async getLibrary(@Args() args: GetLibraryArgs): Promise<LibraryModel> {
    const { libraryId, userId } = args;

    const adapter: GetLibraryAdapter = await GetLibraryAdapter.new({
      libraryId,
      userId,
    });
    const library: LibraryUseCaseDto = await this.getLibraryUseCase.execute(adapter);

    return library;
  }

  @Mutation(() => LibraryModel, { name: 'CreateCustomLibrary' })
  public async createCustomLibrary(@Args() args: CreateLibraryArgs): Promise<LibraryModel> {
    const { userId, name, description, private: isPrivate } = args;

    const adapter: CreateLibraryAdapter = await CreateLibraryAdapter.new({
      userId,
      name,
      description,
      private: isPrivate,
      isCustom: true,
    });
    const createdLibrary: LibraryUseCaseDto = await this.createLibraryUseCase.execute(adapter);

    return createdLibrary;
  }

  @Mutation(() => LibraryModel, { name: 'EditCustomLibrary' })
  public async editCustomLibrary(@Args() args: EditLibraryArgs): Promise<LibraryModel> {
    const { libraryId, userId, name, description, private: isPrivate } = args;

    const adapter: EditLibraryAdapter = await EditLibraryAdapter.new({
      libraryId,
      userId,
      name,
      description,
      private: isPrivate,
    });
    const editedLibrary: LibraryUseCaseDto = await this.editLibraryUseCase.execute(adapter);

    return editedLibrary;
  }

  @Mutation(() => LibraryModel, { name: 'RemoveCustomLibrary' })
  public async removeCustomLibrary(@Args() args: RemoveLibraryArgs): Promise<LibraryModel> {
    const { libraryId, userId } = args;

    const adapter: RemoveLibraryAdapter = await RemoveLibraryAdapter.new({
      libraryId,
      userId,
    });
    const removedLibrary: LibraryUseCaseDto = await this.removeLibraryUseCase.execute(adapter);

    return removedLibrary;
  }

  @Mutation(() => LibraryModel, { name: 'RestoreCustomLibrary' })
  public async restoreCustomLibrary(@Args() args: RestoreLibraryArgs): Promise<LibraryModel> {
    const { libraryId, userId } = args;

    const adapter: RestoreLibraryAdapter = await RestoreLibraryAdapter.new({
      libraryId,
      userId,
    });
    const restoredLibrary: LibraryUseCaseDto = await this.restoreLibraryUseCase.execute(adapter);

    return restoredLibrary;
  }
}
