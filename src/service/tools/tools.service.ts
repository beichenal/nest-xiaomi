import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

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
}
