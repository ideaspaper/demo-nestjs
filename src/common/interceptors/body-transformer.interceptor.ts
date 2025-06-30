import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoBody } from '../../todos/dtos/res/todo.body.dto';
import { mapEntityToDto } from '../utils/mapper.util';

@Injectable()
export class BodyTransformerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    let dtoClass: any;
    if (request.url.includes('/todos')) {
      dtoClass = TodoBody;
    }

    return next.handle().pipe(
      map((data) => {
        if (!dtoClass || !data) {
          console.log("sini?");
          return data;
        }

        if (Array.isArray(data)) {
          return data.map((item) => mapEntityToDto(dtoClass, item));
        } else {
          return mapEntityToDto(dtoClass, data);
        }
      }),
    );
  }
}
