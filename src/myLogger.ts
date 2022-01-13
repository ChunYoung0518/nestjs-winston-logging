import winston from 'winston';
import { getNamespace } from 'continuation-local-storage';
import { WinstonModule } from 'nest-winston';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class myLogger {
  constructor(private readonly winstonLogger: Logger) {}

  // Wrap Winston logger to print tranceId in each log
  static formatMessage(message: string): string {
    const myRequest = getNamespace('tranceId namespace');
    message =
      myRequest && myRequest.get('tranceId')
        ? message + ' tranceId: ' + myRequest.get('tranceId')
        : message;
    return message;
  }

  static getHi(): string {
    return 'Hello World!';
  }

  static loggerWithTranceId = {
    log: function (level, message) {
      this.winstonLogger.log(level, this.formatMessage(message));
    },
    error: function (message) {
      this.winstonLogger.error(this.formatMessage(message));
    },
    warn: function (message) {
      this.winstonLogger.warn(this.formatMessage(message));
    },
    verbose: function (message) {
      this.winstonLogger.verbose(this.formatMessage(message));
    },
    // info: function (message) {
    //   winstonLogger.info(formatMessage(message));
    // },
    debug: function (message) {
      console.log('debug called ---------');
      console.log(message);
      console.log(this.getHi());
      console.log(this.formatMessage(message));
      this.winstonLogger.debug(this.formatMessage(message));
    },
    // silly: function (message) {
    //   winstonLogger.silly(formatMessage(message));
    // },
  };
}
