import { Global, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CoreToken } from '@app/token/CoreToken';
import { NestQueryBusAdapter } from '@infra/adapter/common/message/NestQueryBusAdapter';
import { NestEventBusAdapter } from '@infra/adapter/common/message/NestEventBusAdapter';

const providers: Provider[] = [
  {
    provide: CoreToken.QueryBus,
    useClass: NestQueryBusAdapter,
  },
  {
    provide: CoreToken.EventBus,
    useClass: NestEventBusAdapter,
  },
];

@Global()
@Module({
  imports: [CqrsModule],
  providers,
  exports: [CoreToken.QueryBus, CoreToken.EventBus],
})
export class InfraModule {}
