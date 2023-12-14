import { Controller, Get, Render, Request, Response } from '@nestjs/common';
import { ToolsService } from 'src/service/tools/tools.service';

@Controller('admin/login')
export class LoginController {
  constructor(private toolService: ToolsService) {}

  @Get()
  @Render('admin/login')
  index() {
    return {};
  }

  @Get('code')
  getCode(@Request() req, @Response() res) {
    const codeSvg = this.toolService.captcha();
    req.session.code = codeSvg.text;
    res.type('image/svg+xml');
    res.send(codeSvg.data);
  }
}
