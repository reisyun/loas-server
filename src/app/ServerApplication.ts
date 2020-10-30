import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { RootModule } from '@app/module/RootModule';
import { ApiServerConfig } from '@infra/config/ApiServerConfig';

export class ServerApplication {
  private readonly host: string = ApiServerConfig.HOST;

  private readonly port: number = ApiServerConfig.PORT;

  public static new(): ServerApplication {
    return new ServerApplication();
  }

  public async run() {
    const app = await NestFactory.create<NestExpressApplication>(RootModule);
    await app.listen(this.port, this.host);
    this.log();
  }

  private log(): void {
    Logger.log(`Server ready at: http://${this.host}:${this.port}`, ServerApplication.name);
  }
}
