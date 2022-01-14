import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { v4 as uuidv4 } from 'uuid';
import { createNamespace } from 'continuation-local-storage';

async function bootstrap() {
  const env = process.env.ENV;
  const port = parseInt(process.env.PORT, 10) || 3000;

  const localLogFormat = winston.format.printf(
    ({ level, message, timestamp, label }) => {
      return `${timestamp} ${level} ${label}: ${message}`;
    },
  );

  let myTransport;
  if (env == 'local') {
    myTransport = new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize({ all: true }),
        winston.format.simple(),
        winston.format.label({ label: 'later!' }),
        localLogFormat,
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
  } else if (env == 'dev') {
    myTransport = new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.label({ label: 'later!' }),
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.metadata(),
      ),
    });
  }

  const winstonLogger = WinstonModule.createLogger({
    transports: [myTransport],
  });

  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });
  const myRequest = createNamespace('tranceId namespace');
  app.use(function (req, res, next) {
    myRequest.run(function () {
      myRequest.set('tranceId', uuidv4());
      next();
    });
  });
  winstonLogger.warn('something from main');
  await app.listen(3000);
}
bootstrap();
