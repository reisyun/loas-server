import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { HistoryItemUseCaseDto } from '@core/domain/historyItem/usecase/dto/HistoryItemUseCaseDto';

import { HistoryItemToken } from '@app/token/HistoryItemToken';
import { HistoryItemModel } from '@app/api/graphql/model/HistoryItemModel';

import { AddHistoryItemUseCase } from '@core/domain/historyItem/usecase/AddHistoryItemUseCase';
import { AddHistoryItemArgs } from '@app/api/graphql/resolver/historyItem/args/AddHistoryItemArgs';
import { AddHistoryItemAdapter } from '@infra/adapter/usecase/historyItem/AddHistoryItemAdapter';

/**
 * 기록 아이템 관련 리졸버
 */
@Resolver(() => HistoryItemModel)
export class HistoryItemResolver {
  private readonly addHistoryItemUseCase: AddHistoryItemUseCase;

  public constructor(
    @Inject(HistoryItemToken.AddHistoryItemUseCase)
    addHistoryItemUseCase: AddHistoryItemUseCase,
  ) {
    this.addHistoryItemUseCase = addHistoryItemUseCase;
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
}
