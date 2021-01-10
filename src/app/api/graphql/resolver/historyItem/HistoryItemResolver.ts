import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { HistoryItemUseCaseDto } from '@core/domain/historyItem/usecase/dto/HistoryItemUseCaseDto';

import { HistoryItemToken } from '@app/token/HistoryItemToken';
import { HistoryItemModel } from '@app/api/graphql/model/HistoryItemModel';

import { AddHistoryItemUseCase } from '@core/domain/historyItem/usecase/AddHistoryItemUseCase';
import { AddHistoryItemArgs } from '@app/api/graphql/resolver/historyItem/args/AddHistoryItemArgs';
import { AddHistoryItemAdapter } from '@infra/adapter/usecase/historyItem/AddHistoryItemAdapter';

import { RemoveHistoryItemUseCase } from '@core/domain/historyItem/usecase/RemoveHistoryItemUseCase';
import { RemoveHistoryItemArgs } from '@app/api/graphql/resolver/historyItem/args/RemoveHistoryItemArgs';
import { RemoveHistoryItemAdapter } from '@infra/adapter/usecase/historyItem/RemoveHistoryItemAdapter';

/**
 * 기록 아이템 관련 리졸버
 */
@Resolver(() => HistoryItemModel)
export class HistoryItemResolver {
  private readonly addHistoryItemUseCase: AddHistoryItemUseCase;

  private readonly removeHistoryItemUseCase: RemoveHistoryItemUseCase;

  public constructor(
    @Inject(HistoryItemToken.AddHistoryItemUseCase)
    addHistoryItemUseCase: AddHistoryItemUseCase,
    @Inject(HistoryItemToken.RemoveHistoryItemUseCase)
    removeHistoryItemUseCase: RemoveHistoryItemUseCase,
  ) {
    this.addHistoryItemUseCase = addHistoryItemUseCase;
    this.removeHistoryItemUseCase = removeHistoryItemUseCase;
  }

  @Mutation(() => HistoryItemModel, { name: 'AddHistoryItem' })
  public async addHistoryItem(@Args() args: AddHistoryItemArgs): Promise<HistoryItemUseCaseDto> {
    const { ownerId, category, mediaId } = args;

    const adapter: AddHistoryItemAdapter = await AddHistoryItemAdapter.new({
      executorId: ownerId,
      category,
      mediaId,
    });
    const addedHistoryItem: HistoryItemUseCaseDto = await this.addHistoryItemUseCase.execute(
      adapter,
    );

    return addedHistoryItem;
  }

  @Mutation(() => Boolean, { name: 'RemoveHistoryItem' })
  public async removeHistoryItem(@Args() args: RemoveHistoryItemArgs): Promise<boolean> {
    const { ownerId, historyItemId } = args;

    const adapter: RemoveHistoryItemAdapter = await RemoveHistoryItemAdapter.new({
      executorId: ownerId,
      historyItemId,
    });
    await this.removeHistoryItemUseCase.execute(adapter);

    return true;
  }
}
