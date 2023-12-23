import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Request,
  Response,
} from '@nestjs/common';
import { AdminService } from 'src/service/admin/admin.service';
import { ToolsService } from 'src/service/tools/tools.service';
@Controller('admin/login')
export class LoginController {
  constructor(
    private toolService: ToolsService,
    private adminService: AdminService,
  ) {}

  @Get()
  @Render('admin/login')
  async index() {
    return {};
  }

  @Get('code')
  getCode(@Request() req, @Response() res) {
    const codeSvg = this.toolService.captcha();
    req.session.code = codeSvg.text;
    res.type('image/svg+xml');
    res.send(codeSvg.data);
  }

  @Post('doLogin')
  async doLogin(@Body() body, @Request() req, @Response() res) {
    const { username, password, verify } = body;
    try {
      if (username && password && verify) {
        if (verify.toUpperCase() === req.session.code.toUpperCase()) {
          const pwd = this.toolService.md5(password);
          const result: Array<object> = await this.adminService.find({
            username,
            password: pwd,
          });
          if (result.length > 0) {
            req.session.userinfo = result[0];
            res.redirect('/admin/main');
          } else {
            res.redirect('/admin/login');
          }
        } else {
          return '验证码错误';
        }
      } else {
        return '检查输入项是否正确';
      }
      return '成功';
    } catch (err) {
      res.redirect('/admin/login');
    }
  }
}
