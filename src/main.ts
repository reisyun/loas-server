import 'dotenv/config';
import { ServerApplication } from '@app/ServerApplication';

async function bootstrap(): Promise<void> {
  const serverApplication: ServerApplication = ServerApplication.new();
  await serverApplication.run();
}

(async (): Promise<void> => {
  await bootstrap();
})();
