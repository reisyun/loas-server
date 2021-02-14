import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { HistoryUseCaseDto } from '@core/domain/history/usecase/dto/HistoryUseCaseDto';

import { HistoryToken } from '@app/token/HistoryToken';
import { HistoryModel } from '@app/api/graphql/model/HistoryModel';

import { CreateHistoryUseCase } from '@core/domain/history/usecase/CreateHistoryUseCase';
import { CreateHistoryArgs } from '@app/api/graphql/resolver/history/args/CreateHistoryArgs';
import { CreateHistoryAdapter } from '@infra/adapter/usecase/history/CreateHistoryAdapter';

import { EditHistoryUseCase } from '@core/domain/history/usecase/EditHistoryUseCase';
import { EditHistoryArgs } from '@app/api/graphql/resolver/history/args/EditHistoryArgs';
import { EditHistoryAdapter } from '@infra/adapter/usecase/history/EditHistoryAdapter';

import { ChangeHistoryStatusUseCase } from '@core/domain/history/usecase/ChangeHistoryStatusUseCase';
import { ChangeHistoryStatusArgs } from '@app/api/graphql/resolver/history/args/ChangeHistoryStatusArgs';
import { ChangeHistoryStatusAdapter } from '@infra/adapter/usecase/history/ChangeHistoryStatusAdapter';

/**
 * 기록 관련 리졸버
 */
@Resolver(() => HistoryModel)
export class HistoryResolver {
  private readonly createHistoryUseCase: CreateHistoryUseCase;

  private readonly editHistoryUseCase: EditHistoryUseCase;

  private readonly changeHistoryStatusUseCase: ChangeHistoryStatusUseCase;

  public constructor(
    @Inject(HistoryToken.CreateHistoryUseCase) createHistoryUseCase: CreateHistoryUseCase,
    @Inject(HistoryToken.EditHistoryUseCase) editHistoryUseCase: EditHistoryUseCase,
    @Inject(HistoryToken.ChangeHistoryStatusUseCase)
    changeHistoryStatusUseCase: ChangeHistoryStatusUseCase,
  ) {
    this.createHistoryUseCase = createHistoryUseCase;
    this.editHistoryUseCase = editHistoryUseCase;
    this.changeHistoryStatusUseCase = changeHistoryStatusUseCase;
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

  @Mutation(() => HistoryModel, { name: 'EditHistory' })
  public async editHistory(@Args() args: EditHistoryArgs): Promise<HistoryUseCaseDto> {
    const { userId, historyId, repeat, secret, completedAt } = args;

    const adapter: EditHistoryAdapter = await EditHistoryAdapter.new({
      executorId: userId,
      historyId,
      repeat,
      secret,
      completedAt,
    });
    const history: HistoryUseCaseDto = await this.editHistoryUseCase.execute(adapter);

    return history;
  }

  @Mutation(() => HistoryModel, { name: 'ChangeHistoryStatus' })
  public async changeHistoryStatus(
    @Args() args: ChangeHistoryStatusArgs,
  ): Promise<HistoryUseCaseDto> {
    const { userId, historyId, status } = args;

    const adapter: ChangeHistoryStatusAdapter = await ChangeHistoryStatusAdapter.new({
      executorId: userId,
      historyId,
      status,
    });
    const history: HistoryUseCaseDto = await this.changeHistoryStatusUseCase.execute(adapter);

    return history;
  }
}
