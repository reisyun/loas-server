import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { LibraryUseCaseDto } from '@core/domain/library/usecase/dto/LibraryUseCaseDto';
import { CreateLibraryUseCase } from '@core/domain/library/usecase/CreateLibraryUseCase';
import { LibraryToken } from '@app/token/LibraryToken';
import { LibraryModel } from '@app/api/graphql/model/LibraryModel';
import { CreateLibraryArgs } from '@app/api/graphql/resolver/library/dto/CreateLibraryArgs';
import { CreateLibraryAdapter } from '@infra/adapter/library/usecase/CreateLibraryAdapter';

/**
 * 라이브러리 관련 리졸버
 */
@Resolver(() => LibraryModel)
export class LibraryResolver {
  private readonly createLibraryUseCase: CreateLibraryUseCase;

  public constructor(
    @Inject(LibraryToken.CreateLibraryUseCase) createLibraryUseCase: CreateLibraryUseCase,
  ) {
    this.createLibraryUseCase = createLibraryUseCase;
  }

  @Mutation(() => LibraryModel, { name: 'CreateCustomLibrary' })
  public async createCustomLibrary(@Args() args: CreateLibraryArgs) {
    const { userId, name, description, private: isPrivate } = args;

    const adapter: CreateLibraryAdapter = await CreateLibraryAdapter.new({
      userId,
      name,
      description,
      private: isPrivate,
      isCustom: true,
    });
    const library: LibraryUseCaseDto = await this.createLibraryUseCase.execute(adapter);

    return library;
  }
}
