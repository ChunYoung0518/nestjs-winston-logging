import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    // WinstonModule.forRoot({
    //   transports: [
    //     new winston.transports.Console({
    //       level: 'debug',
    //       format: winston.format.combine(
    //         winston.format.timestamp(),
    //         winston.format.json(),
    //       ),
    //     }),
    //   ],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
