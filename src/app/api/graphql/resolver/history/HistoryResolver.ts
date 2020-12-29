import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { HistoryUseCaseDto } from '@core/domain/history/usecase/dto/HistoryUseCaseDto';

import { HistoryToken } from '@app/token/HistoryToken';
import { HistoryModel } from '@app/api/graphql/model/HistoryModel';
import { HistoryItemModel } from '@app/api/graphql/model/HistoryItemModel';

import { AddHistoryItemUseCase } from '@core/domain/history/usecase/AddHistoryItemUseCase';
import { AddHistoryItemArgs } from '@app/api/graphql/resolver/history/args/AddHistoryItemArgs';
import { AddHistoryItemAdapter } from '@infra/adapter/usecase/history/AddHistoryItemAdapter';

/**
 * 기록 관련 리졸버
 */
@Resolver(() => HistoryModel)
export class HistoryResolver {
  private readonly addHistoryItemUseCase: AddHistoryItemUseCase;

  public constructor(
    @Inject(HistoryToken.AddHistoryItemUseCase)
    addHistoryItemUseCase: AddHistoryItemUseCase,
  ) {
    this.addHistoryItemUseCase = addHistoryItemUseCase;
  }

  @Mutation(() => [HistoryItemModel], { name: 'AddHistoryItem' })
  public async addHistoryItem(
    @Args() args: AddHistoryItemArgs,
  ): Promise<HistoryUseCaseDto['historyItems']> {
    const { historyId, mediaId } = args;

    const adapter: AddHistoryItemAdapter = await AddHistoryItemAdapter.new({
      historyId,
      mediaId,
    });
    const addedHistoryItem: HistoryUseCaseDto = await this.addHistoryItemUseCase.execute(adapter);

    return addedHistoryItem.historyItems;
  }
}
