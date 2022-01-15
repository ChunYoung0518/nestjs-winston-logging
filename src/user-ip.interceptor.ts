import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class UserIpInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('this is the Interceptor----------');
    this.cls.set('key', 'my value set from interceptor');
    return next.handle();
  }
}
