import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
import { MD5 } from 'crypto-js';
@Injectable()
export class ToolsService {
  captcha() {
    const capthca = svgCaptcha.create({
      size: 4,
      fontSize: 40,
      width: 100,
      height: 34,
      background: '#cc9966',
    });
    return capthca;
  }

  md5(str) {
    return MD5(str).toString();
  }
}
