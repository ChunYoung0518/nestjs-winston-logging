import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly winstonLogger: Logger,
  ) {}

  @Get()
  getHello(): string {
    this.winstonLogger.log('This is just an info');
    this.winstonLogger.warn('This is just a warning');
    this.winstonLogger.error('This is an error');
    this.winstonLogger.debug('This is a debug message');
    return this.appService.getHello();
  }
}
