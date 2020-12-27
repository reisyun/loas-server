import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';

import { CollectionToken } from '@app/token/CollectionToken';
import { CollectionModel } from '@app/api/graphql/model/CollectionModel';
import { CollectionItemModel } from '@app/api/graphql/model/CollectionItemModel';

import { GetCollectionUseCase } from '@core/domain/collection/usecase/GetCollectionUseCase';
import { GetCollectionArgs } from '@app/api/graphql/resolver/collection/args/GetCollectionArgs';
import { GetCollectionAdapter } from '@infra/adapter/usecase/collection/GetCollectionAdapter';

import { GetCollectionListUseCase } from '@core/domain/collection/usecase/GetCollectionListUseCase';
import { GetCollectionListArgs } from '@app/api/graphql/resolver/collection/args/GetCollectionListArgs';
import { GetCollectionListAdapter } from '@infra/adapter/usecase/collection/GetCollectionListAdapter';

import { CreateCollectionUseCase } from '@core/domain/collection/usecase/CreateCollectionUseCase';
import { CreateCollectionArgs } from '@app/api/graphql/resolver/collection/args/CreateCollectionArgs';
import { CreateCollectionAdapter } from '@infra/adapter/usecase/collection/CreateCollectionAdapter';

import { EditCollectionUseCase } from '@core/domain/collection/usecase/EditCollectionUseCase';
import { EditCollectionArgs } from '@app/api/graphql/resolver/collection/args/EditCollectionArgs';
import { EditCollectionAdapter } from '@infra/adapter/usecase/collection/EditCollectionAdapter';

import { RemoveCollectionUseCase } from '@core/domain/collection/usecase/RemoveCollectionUseCase';
import { RemoveCollectionArgs } from '@app/api/graphql/resolver/collection/args/RemoveCollectionArgs';
import { RemoveCollectionAdapter } from '@infra/adapter/usecase/collection/RemoveCollectionAdapter';

import { RestoreCollectionUseCase } from '@core/domain/collection/usecase/RestoreCollectionUseCase';
import { RestoreCollectionArgs } from '@app/api/graphql/resolver/collection/args/RestoreCollectionArgs';
import { RestoreCollectionAdapter } from '@infra/adapter/usecase/collection/RestoreCollectionAdapter';

import { AddCollectionItemUseCase } from '@core/domain/collection/usecase/AddCollectionItemUseCase';
import { AddCollectionItemArgs } from '@app/api/graphql/resolver/collection/args/AddCollectionItemArgs';
import { AddCollectionItemAdapter } from '@infra/adapter/usecase/collection/AddCollectionItemAdapter';

/**
 * 컬렉션 관련 리졸버
 */
@Resolver(() => CollectionModel)
export class CollectionResolver {
  private readonly getCollectionUseCase: GetCollectionUseCase;

  private readonly getCollectionListUseCase: GetCollectionListUseCase;

  private readonly createCollectionUseCase: CreateCollectionUseCase;

  private readonly editCollectionUseCase: EditCollectionUseCase;

  private readonly removeCollectionUseCase: RemoveCollectionUseCase;

  private readonly restoreCollectionUseCase: RestoreCollectionUseCase;

  private readonly addCollectionItemUseCase: AddCollectionItemUseCase;

  public constructor(
    @Inject(CollectionToken.GetCollectionUseCase)
    getCollectionUseCase: GetCollectionUseCase,

    @Inject(CollectionToken.GetCollectionListUseCase)
    getCollectionListUseCase: GetCollectionListUseCase,

    @Inject(CollectionToken.CreateCollectionUseCase)
    createCollectionUseCase: CreateCollectionUseCase,

    @Inject(CollectionToken.EditCollectionUseCase) editCollectionUseCase: EditCollectionUseCase,

    @Inject(CollectionToken.RemoveCollectionUseCase)
    removeCollectionUseCase: RemoveCollectionUseCase,

    @Inject(CollectionToken.RestoreCollectionUseCase)
    restoreCollectionUseCase: RestoreCollectionUseCase,

    @Inject(CollectionToken.AddCollectionItemUseCase)
    addCollectionItemUseCase: AddCollectionItemUseCase,
  ) {
    this.getCollectionUseCase = getCollectionUseCase;
    this.getCollectionListUseCase = getCollectionListUseCase;
    this.createCollectionUseCase = createCollectionUseCase;
    this.editCollectionUseCase = editCollectionUseCase;
    this.removeCollectionUseCase = removeCollectionUseCase;
    this.restoreCollectionUseCase = restoreCollectionUseCase;
    this.addCollectionItemUseCase = addCollectionItemUseCase;
  }

  @Query(() => CollectionModel, { name: 'GetCollection' })
  public async getCollection(@Args() args: GetCollectionArgs): Promise<CollectionUseCaseDto> {
    const { executorId, collectionId } = args;

    const adapter: GetCollectionAdapter = await GetCollectionAdapter.new({
      executorId,
      collectionId,
    });
    const collection: CollectionUseCaseDto = await this.getCollectionUseCase.execute(adapter);

    return collection;
  }

  @Query(() => [CollectionModel], { name: 'GetCollectionList' })
  public async getCollectionList(
    @Args() args: GetCollectionListArgs,
  ): Promise<CollectionUseCaseDto[]> {
    const { userId, name } = args;

    const adapter: GetCollectionListAdapter = await GetCollectionListAdapter.new({
      collectorId: userId,
      name,
    });
    const collectionList: CollectionUseCaseDto[] = await this.getCollectionListUseCase.execute(
      adapter,
    );

    return collectionList;
  }

  @Mutation(() => CollectionModel, { name: 'CreateCollection' })
  public async createCollection(@Args() args: CreateCollectionArgs): Promise<CollectionUseCaseDto> {
    const { userId, name, description } = args;

    const adapter: CreateCollectionAdapter = await CreateCollectionAdapter.new({
      collectorId: userId,
      name,
      description,
    });
    const createdCollection: CollectionUseCaseDto = await this.createCollectionUseCase.execute(
      adapter,
    );

    return createdCollection;
  }

  @Mutation(() => CollectionModel, { name: 'EditCollection' })
  public async editCollection(@Args() args: EditCollectionArgs): Promise<CollectionUseCaseDto> {
    const { collectionId, userId, name, description } = args;

    const adapter: EditCollectionAdapter = await EditCollectionAdapter.new({
      collectionId,
      collectorId: userId,
      name,
      description,
    });
    const editedCollection: CollectionUseCaseDto = await this.editCollectionUseCase.execute(
      adapter,
    );

    return editedCollection;
  }

  @Mutation(() => CollectionModel, { name: 'RemoveCollection' })
  public async removeCollection(@Args() args: RemoveCollectionArgs): Promise<CollectionUseCaseDto> {
    const { collectionId, userId } = args;

    const adapter: RemoveCollectionAdapter = await RemoveCollectionAdapter.new({
      collectionId,
      collectorId: userId,
    });
    const removedCollection: CollectionUseCaseDto = await this.removeCollectionUseCase.execute(
      adapter,
    );

    return removedCollection;
  }

  @Mutation(() => CollectionModel, { name: 'RestoreCollection' })
  public async restoreCollection(
    @Args() args: RestoreCollectionArgs,
  ): Promise<CollectionUseCaseDto> {
    const { collectionId, userId } = args;

    const adapter: RestoreCollectionAdapter = await RestoreCollectionAdapter.new({
      collectionId,
      collectorId: userId,
    });
    const restoredCollection: CollectionUseCaseDto = await this.restoreCollectionUseCase.execute(
      adapter,
    );

    return restoredCollection;
  }

  @Mutation(() => [CollectionItemModel], { name: 'AddCollectionItem' })
  public async addCollectionItem(
    @Args() args: AddCollectionItemArgs,
  ): Promise<CollectionUseCaseDto['collectionItems']> {
    const { collectionId, mediaId } = args;

    const adapter: AddCollectionItemAdapter = await AddCollectionItemAdapter.new({ collectionId, mediaId });
    const addedCollectionItem: CollectionUseCaseDto = await this.addCollectionItemUseCase.execute(
      adapter,
    );

    return addedCollectionItem.collectionItems;
  }
}
