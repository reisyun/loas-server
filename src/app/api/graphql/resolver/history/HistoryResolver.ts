import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { HistoryUseCaseDto } from '@core/domain/history/usecase/dto/HistoryUseCaseDto';

import { HistoryToken } from '@app/token/HistoryToken';
import { HistoryModel } from '@app/api/graphql/model/HistoryModel';

import { CreateHistoryUseCase } from '@core/domain/history/usecase/CreateHistoryUseCase';
import { CreateHistoryArgs } from '@app/api/graphql/resolver/history/args/CreateHistoryArgs';
import { CreateHistoryAdapter } from '@infra/adapter/usecase/history/CreateHistoryAdapter';

/**
 * 기록 관련 리졸버
 */
@Resolver(() => HistoryModel)
export class HistoryResolver {
  private readonly createHistoryUseCase: CreateHistoryUseCase;

  public constructor(
    @Inject(HistoryToken.CreateHistoryUseCase) createHistoryUseCase: CreateHistoryUseCase,
  ) {
    this.createHistoryUseCase = createHistoryUseCase;
  }

  @Mutation(() => HistoryModel, { name: 'CreateHistory' })
  public async createHistory(@Args() args: CreateHistoryArgs): Promise<HistoryUseCaseDto> {
    const { userId, mediaId, status, repeat, secret, completedAt } = args;

    const adapter: CreateHistoryAdapter = await CreateHistoryAdapter.new({
      executorId: userId,
      mediaId,
      status,
      repeat,
      secret,
      completedAt,
    });
    const history: HistoryUseCaseDto = await this.createHistoryUseCase.execute(adapter);

    return history;
  }
}
