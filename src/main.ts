import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { transport } from 'winston';

async function bootstrap() {
  const env = process.env.ENV;
  const port = parseInt(process.env.PORT, 10) || 3000;

  let myTransport;
  if (env == 'local') {
    myTransport = new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    });
  } else if (env == 'stg') {
    myTransport = new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    });
  }

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [myTransport],
    }),
  });
  await app.listen(3000);
}
bootstrap();
