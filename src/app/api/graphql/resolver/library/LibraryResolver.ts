import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { LibraryUseCaseDto } from '@core/domain/library/usecase/dto/LibraryUseCaseDto';
import { GetLibraryUseCase } from '@core/domain/library/usecase/GetLibraryUseCase';
import { CreateLibraryUseCase } from '@core/domain/library/usecase/CreateLibraryUseCase';
import { LibraryToken } from '@app/token/LibraryToken';
import { LibraryModel } from '@app/api/graphql/model/LibraryModel';
import { GetLibraryArgs } from '@app/api/graphql/resolver/library/dto/GetLibraryArgs';
import { CreateLibraryArgs } from '@app/api/graphql/resolver/library/dto/CreateLibraryArgs';
import { GetLibraryAdapter } from '@infra/adapter/library/usecase/GetLibraryAdapter';
import { CreateLibraryAdapter } from '@infra/adapter/library/usecase/CreateLibraryAdapter';

/**
 * 라이브러리 관련 리졸버
 */
@Resolver(() => LibraryModel)
export class LibraryResolver {
  private readonly getLibraryUseCase: GetLibraryUseCase;

  private readonly createLibraryUseCase: CreateLibraryUseCase;

  public constructor(
    @Inject(LibraryToken.GetLibraryUseCase) getLibraryUseCase: GetLibraryUseCase,
    @Inject(LibraryToken.CreateLibraryUseCase) createLibraryUseCase: CreateLibraryUseCase,
  ) {
    this.getLibraryUseCase = getLibraryUseCase;
    this.createLibraryUseCase = createLibraryUseCase;
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
}
