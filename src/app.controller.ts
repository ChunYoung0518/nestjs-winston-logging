import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { myLogger } from './myLogger';
import { getNamespace } from 'continuation-local-storage';
import { UserIpInterceptor } from './user-ip.interceptor';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly winstonLogger: Logger
  ) {}

  formatMessage(message): string {
    const myRequest = getNamespace('tranceId namespace');
    message =
      myRequest && myRequest.get('tranceId')
        ? message + ' tranceId: ' + myRequest.get('tranceId')
        : message;
    return message;
  }

  @Get()
  getHello(): string {
    // myLogger.loggerWithTranceId.debug('something with traceId~~~~~~~~~~~~~');
    Logger.log(myLogger.formatMessage('Default log from nestjs common'));
    Logger.error('Default error log -- from nestjs common');
    this.winstonLogger.log('This is just an info');
    this.winstonLogger.warn('This is just a warning');
    this.winstonLogger.error('This is an error');
    this.winstonLogger.debug('This is a debug message');
    return this.appService.getHello();
  }
}
