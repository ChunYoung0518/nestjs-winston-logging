import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ClsModule } from 'nestjs-cls';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserIpInterceptor } from './user-ip.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClsModule.register({
      global: true,
      middleware: { mount: true },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserIpInterceptor,
    },
  ],
})
export class AppModule {}
