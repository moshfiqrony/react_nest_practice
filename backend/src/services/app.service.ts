import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(params) {
    return ({
      ok: false,
      data: params
    });
  }

  getAppName() {
    return ({
      ok: false,
      data: 'react_nest_practice'
    });
  }
}
