import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { CollectionUseCaseDto } from '@core/domain/collection/usecase/dto/CollectionUseCaseDto';
import { CollectionToken } from '@app/token/CollectionToken';
import { CollectionModel } from '@app/api/graphql/model/CollectionModel';

import { GetCollectionUseCase } from '@core/domain/collection/usecase/GetCollectionUseCase';
import { GetCollectionArgs } from '@app/api/graphql/resolver/collection/dto/GetCollectionArgs';
import { GetCollectionAdapter } from '@infra/adapter/collection/usecase/GetCollectionAdapter';

import { CreateCollectionUseCase } from '@core/domain/collection/usecase/CreateCollectionUseCase';
import { CreateCollectionArgs } from '@app/api/graphql/resolver/collection/dto/CreateCollectionArgs';
import { CreateCollectionAdapter } from '@infra/adapter/collection/usecase/CreateCollectionAdapter';

import { EditCollectionUseCase } from '@core/domain/collection/usecase/EditCollectionUseCase';
import { EditCollectionArgs } from '@app/api/graphql/resolver/collection/dto/EditCollectionArgs';
import { EditCollectionAdapter } from '@infra/adapter/collection/usecase/EditCollectionAdapter';

import { RemoveCollectionUseCase } from '@core/domain/collection/usecase/RemoveCollectionUseCase';
import { RemoveCollectionArgs } from '@app/api/graphql/resolver/collection/dto/RemoveCollectionArgs';
import { RemoveCollectionAdapter } from '@infra/adapter/collection/usecase/RemoveCollectionAdapter';

import { RestoreCollectionUseCase } from '@core/domain/collection/usecase/RestoreCollectionUseCase';
import { RestoreCollectionArgs } from '@app/api/graphql/resolver/collection/dto/RestoreCollectionArgs';
import { RestoreCollectionAdapter } from '@infra/adapter/collection/usecase/RestoreCollectionAdapter';

/**
 * 컬렉션 관련 리졸버
 */
@Resolver(() => CollectionModel)
export class CollectionResolver {
  private readonly getCollectionUseCase: GetCollectionUseCase;

  private readonly createCollectionUseCase: CreateCollectionUseCase;

  private readonly editCollectionUseCase: EditCollectionUseCase;

  private readonly removeCollectionUseCase: RemoveCollectionUseCase;

  private readonly restoreCollectionUseCase: RestoreCollectionUseCase;

  public constructor(
    @Inject(CollectionToken.GetCollectionUseCase) getCollectionUseCase: GetCollectionUseCase,

    @Inject(CollectionToken.CreateCollectionUseCase)
    createCollectionUseCase: CreateCollectionUseCase,

    @Inject(CollectionToken.EditCollectionUseCase) editCollectionUseCase: EditCollectionUseCase,

    @Inject(CollectionToken.RemoveCollectionUseCase)
    removeCollectionUseCase: RemoveCollectionUseCase,

    @Inject(CollectionToken.RestoreCollectionUseCase)
    restoreCollectionUseCase: RestoreCollectionUseCase,
  ) {
    this.getCollectionUseCase = getCollectionUseCase;
    this.createCollectionUseCase = createCollectionUseCase;
    this.editCollectionUseCase = editCollectionUseCase;
    this.removeCollectionUseCase = removeCollectionUseCase;
    this.restoreCollectionUseCase = restoreCollectionUseCase;
  }

  @Query(() => [CollectionModel], { name: 'GetCollections' })
  public async getCollections(@Args() args: GetCollectionArgs): Promise<CollectionUseCaseDto[]> {
    const { collectionId, userId } = args;

    const adapter: GetCollectionAdapter = await GetCollectionAdapter.new({
      collectionId,
      collectorId: userId,
    });
    const collections: CollectionUseCaseDto[] = await this.getCollectionUseCase.execute(adapter);

    return collections;
  }

  @Mutation(() => CollectionModel, { name: 'CreateCustomCollection' })
  public async createCustomCollection(
    @Args() args: CreateCollectionArgs,
  ): Promise<CollectionUseCaseDto> {
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

  @Mutation(() => CollectionModel, { name: 'EditCustomCollection' })
  public async editCustomCollection(
    @Args() args: EditCollectionArgs,
  ): Promise<CollectionUseCaseDto> {
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

  @Mutation(() => CollectionModel, { name: 'RemoveCustomCollection' })
  public async removeCustomCollection(
    @Args() args: RemoveCollectionArgs,
  ): Promise<CollectionUseCaseDto> {
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

  @Mutation(() => CollectionModel, { name: 'RestoreCustomCollection' })
  public async restoreCustomCollection(
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
}
