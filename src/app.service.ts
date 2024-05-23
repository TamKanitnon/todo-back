import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    // return 'Hello World!';
    return process.env.npm_lifecycle_event;
  }
}
