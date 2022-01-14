import { Injectable, Logger } from '@nestjs/common';
import { getNamespace } from 'continuation-local-storage';
import * as winston from 'winston';

@Injectable()
export class AppService {
  constructor(private readonly winstonLogger: Logger) {}

  formatMessage(message): string {
    const myRequest = getNamespace('tranceId namespace');
    message =
      myRequest && myRequest.get('tranceId')
        ? `${myRequest.get('tranceId')} - ${message}`
        : message;
    return message;
  }

  localLogFormat = winston.format.printf(
    ({ level, message, timestamp, label, info }) => {
      return `${timestamp} ${level} ${label} ${info}: ${message}`;
    },
  );

  myTransport = new winston.transports.Console({
    level: 'debug',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize({ all: true }),
      winston.format.simple(),
      winston.format.label({ label: 'later!' }),
      // winston.format(function (info, opts) {
      //   console.log(`{ reason: ${info.reason}, promise: ${info.promise} }`);
      //   return info;
      // })(),
      this.localLogFormat,
    ),
  });

  logger = winston.createLogger({
    level: 'info',
    transports: [this.myTransport],
  });

  // getHello(): string {
  //   this.winstonLogger.log(this.formatMessage(`logs from service`));
  //   this.winstonLogger.warn(this.formatMessage(`logs from service`), {
  //     data: 'extra data',
  //   });
  //   return 'Hello World!';
  // }

  getHello(): string {
    // this.logger.info('my message', { reason: 'reason', promise: 'promise' });
    this.logger.log('debug', 'hi', 123, { a: 1, b: 'two' });
    return 'Hello World!';
  }
}
