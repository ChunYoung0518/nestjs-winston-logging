import { Injectable, Logger } from '@nestjs/common';
import { getNamespace } from 'continuation-local-storage';

@Injectable()
export class AppService {
  constructor(private readonly winstonLogger: Logger) {}

  formatMessage(message): string {
    const myRequest = getNamespace('tranceId namespace');
    message =
      myRequest && myRequest.get('tranceId')
        ? message + ' tranceId: ' + myRequest.get('tranceId')
        : message;
    return message;
  }

  getHello(): string {
    this.winstonLogger.log(this.formatMessage(`logs from service`));
    return 'Hello World!';
  }
}
