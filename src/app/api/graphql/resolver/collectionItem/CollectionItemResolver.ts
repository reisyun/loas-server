import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { CollectionItemUseCaseDto } from '@core/domain/collectionItem/usecase/dto/CollectionItemUseCaseDto';

import { CollectionItemToken } from '@app/token/CollectionItemToken';
import { CollectionItemModel } from '@app/api/graphql/model/CollectionItemModel';

import { AddCollectionItemUseCase } from '@core/domain/collectionItem/usecase/AddCollectionItemUseCase';
import { AddCollectionItemArgs } from '@app/api/graphql/resolver/collectionItem/dto/AddCollectionItemArgs';
import { AddCollectionItemAdapter } from '@infra/adapter/usecase/collectionItem/AddCollectionItemAdapter';

/**
 * 컬렉션 아이템 관련 리졸버
 */
@Resolver(() => CollectionItemModel)
export class CollectionItemResolver {
  private readonly addCollectionItemUseCase: AddCollectionItemUseCase;

  public constructor(
    @Inject(CollectionItemToken.AddCollectionItemUseCase)
    addCollectionItemUseCase: AddCollectionItemUseCase,
  ) {
    this.addCollectionItemUseCase = addCollectionItemUseCase;
  }

  @Mutation(() => CollectionItemModel, { name: 'AddCollectionItem' })
  public async addCollectionItem(
    @Args() args: AddCollectionItemArgs,
  ): Promise<CollectionItemUseCaseDto> {
    const { collectionId, private: isPrivate, completedAt, like, repeat } = args;

    const adapter: AddCollectionItemAdapter = await AddCollectionItemAdapter.new({
      collectionId,
      private: isPrivate,
      completedAt,
      like,
      repeat,
    });
    const addedCollectionItem: CollectionItemUseCaseDto = await this.addCollectionItemUseCase.execute(
      adapter,
    );

    return addedCollectionItem;
  }
}
