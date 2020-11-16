import { Global, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CoreToken } from '@app/token/CoreToken';
import { NestQueryBusAdapter } from '@infra/adapter/common/message/NestQueryBusAdapter';

const providers: Provider[] = [
  {
    provide: CoreToken.QueryBus,
    useClass: NestQueryBusAdapter,
  },
];

@Global()
@Module({
  imports: [CqrsModule],
  providers,
  exports: [CoreToken.QueryBus],
})
export class InfraModule {}
