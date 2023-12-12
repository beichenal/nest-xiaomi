import { Controller, Get } from '@nestjs/common';

@Controller('admin/manager')
export class ManagerController {
  @Get()
  index() {
    return '管理员页面';
  }
}
