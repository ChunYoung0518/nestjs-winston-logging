import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly winstonLogger: Logger,
  ) {}

  @Get()
  getHello(): string {
    this.winstonLogger.info('This is just an info');
    this.winstonLogger.warn('This is just a warning');
    this.winstonLogger.error('This is an error');
    this.winstonLogger.debug('This is a debug message');
    return this.appService.getHello();
  }
}
