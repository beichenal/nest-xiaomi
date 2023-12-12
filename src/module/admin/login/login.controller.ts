import { Controller, Get } from '@nestjs/common';

@Controller('admin/login')
export class LoginController {
  @Get()
  index() {
    return '登录页';
  }
}
