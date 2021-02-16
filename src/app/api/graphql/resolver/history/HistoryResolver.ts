import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { HistoryUseCaseDto } from '@core/domain/history/usecase/dto/HistoryUseCaseDto';

import { HistoryToken } from '@app/token/HistoryToken';
import { HistoryModel } from '@app/api/graphql/model/HistoryModel';

import { GetHistoryUseCase } from '@core/domain/history/usecase/GetHistoryUseCase';
import { GetHistoryArgs } from '@app/api/graphql/resolver/history/args/GetHistoryArgs';
import { GetHistoryAdapter } from '@infra/adapter/usecase/history/GetHistoryAdapter';

import { GetHistoryListUseCase } from '@core/domain/history/usecase/GetHistoryListUseCase';
import { GetHistoryListArgs } from '@app/api/graphql/resolver/history/args/GetHistoryListArgs';
import { GetHistoryListAdapter } from '@infra/adapter/usecase/history/GetHistoryListAdapter';

import { CreateHistoryUseCase } from '@core/domain/history/usecase/CreateHistoryUseCase';
import { CreateHistoryArgs } from '@app/api/graphql/resolver/history/args/CreateHistoryArgs';
import { CreateHistoryAdapter } from '@infra/adapter/usecase/history/CreateHistoryAdapter';

import { EditHistoryUseCase } from '@core/domain/history/usecase/EditHistoryUseCase';
import { EditHistoryArgs } from '@app/api/graphql/resolver/history/args/EditHistoryArgs';
import { EditHistoryAdapter } from '@infra/adapter/usecase/history/EditHistoryAdapter';

import { ChangeHistoryStatusUseCase } from '@core/domain/history/usecase/ChangeHistoryStatusUseCase';
import { ChangeHistoryStatusArgs } from '@app/api/graphql/resolver/history/args/ChangeHistoryStatusArgs';
import { ChangeHistoryStatusAdapter } from '@infra/adapter/usecase/history/ChangeHistoryStatusAdapter';

import { RemoveHistoryUseCase } from '@core/domain/history/usecase/RemoveHistoryUseCase';
import { RemoveHistoryArgs } from '@app/api/graphql/resolver/history/args/RemoveHistoryArgs';
import { RemoveHistoryAdapter } from '@infra/adapter/usecase/history/RemoveHistoryAdapter';

/**
 * 기록 관련 리졸버
 */
@Resolver(() => HistoryModel)
export class HistoryResolver {
  public constructor(
    @Inject(HistoryToken.GetHistoryUseCase)
    private readonly getHistoryUseCase: GetHistoryUseCase,

    @Inject(HistoryToken.GetHistoryListUseCase)
    private readonly getHistoryListUseCase: GetHistoryListUseCase,

    @Inject(HistoryToken.CreateHistoryUseCase)
    private readonly createHistoryUseCase: CreateHistoryUseCase,

    @Inject(HistoryToken.EditHistoryUseCase)
    private readonly editHistoryUseCase: EditHistoryUseCase,

    @Inject(HistoryToken.ChangeHistoryStatusUseCase)
    private readonly changeHistoryStatusUseCase: ChangeHistoryStatusUseCase,

    @Inject(HistoryToken.RemoveHistoryUseCase)
    private readonly removeHistoryUseCase: RemoveHistoryUseCase,
  ) {}

  @Query(() => HistoryModel, { name: 'GetHistory' })
  public async getHistory(@Args() args: GetHistoryArgs): Promise<HistoryUseCaseDto> {
    const { userId, historyId } = args;

    const adapter: GetHistoryAdapter = await GetHistoryAdapter.new({
      executorId: userId,
      historyId,
    });
    const history: HistoryUseCaseDto = await this.getHistoryUseCase.execute(adapter);

    return history;
  }

  @Query(() => [HistoryModel], { name: 'GetHistoryList' })
  public async getHistoryList(@Args() args: GetHistoryListArgs): Promise<HistoryUseCaseDto[]> {
    const { userId, ownerId, status } = args;

    const adapter: GetHistoryListAdapter = await GetHistoryListAdapter.new({
      executorId: userId,
      ownerId,
      status,
    });
    const historyList: HistoryUseCaseDto[] = await this.getHistoryListUseCase.execute(adapter);

    return historyList;
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

  @Mutation(() => Boolean, { name: 'ChangeHistoryStatus' })
  public async changeHistoryStatus(@Args() args: ChangeHistoryStatusArgs): Promise<boolean> {
    const { userId, historyId, status } = args;

    const adapter: ChangeHistoryStatusAdapter = await ChangeHistoryStatusAdapter.new({
      executorId: userId,
      historyId,
      status,
    });
    await this.changeHistoryStatusUseCase.execute(adapter);

    return true;
  }

  @Mutation(() => Boolean, { name: 'RemoveHistory' })
  public async removeHistory(@Args() args: RemoveHistoryArgs): Promise<boolean> {
    const { userId, historyId } = args;

    const adapter: RemoveHistoryAdapter = await RemoveHistoryAdapter.new({
      executorId: userId,
      historyId,
    });

    await this.removeHistoryUseCase.execute(adapter);

    return true;
  }
}
