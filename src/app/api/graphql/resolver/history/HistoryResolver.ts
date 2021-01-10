import { Resolver, Query, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { HistoryUseCaseDto } from '@core/domain/history/usecase/dto/HistoryUseCaseDto';

import { HistoryToken } from '@app/token/HistoryToken';
import { HistoryModel } from '@app/api/graphql/model/HistoryModel';

import { GetHistoryUseCase } from '@core/domain/history/usecase/GetHistoryUseCase';
import { GetHistoryArgs } from '@app/api/graphql/resolver/history/args/GetHistoryArgs';
import { GetHistoryAdapter } from '@infra/adapter/usecase/history/GetHistoryAdapter';

/**
 * 기록 관련 리졸버
 */
@Resolver(() => HistoryModel)
export class HistoryResolver {
  private readonly getHistoryUseCase: GetHistoryUseCase;

  public constructor(
    @Inject(HistoryToken.GetHistoryUseCase)
    getHistoryUseCase: GetHistoryUseCase,
  ) {
    this.getHistoryUseCase = getHistoryUseCase;
  }

  @Query(() => HistoryModel, { name: 'GetHistory' })
  public async getHistory(@Args() args: GetHistoryArgs): Promise<HistoryUseCaseDto> {
    const { ownerId, category } = args;

    const adapter: GetHistoryAdapter = await GetHistoryAdapter.new({
      executorId: ownerId,
      category,
    });
    const history: HistoryUseCaseDto = await this.getHistoryUseCase.execute(adapter);

    return history;
  }
}
