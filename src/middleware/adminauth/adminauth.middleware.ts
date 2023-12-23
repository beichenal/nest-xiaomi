import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AdminauthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // 获取访问录取
    const path = req.baseUrl;
    const whiteList = [
      '/admin/login',
      '/admin/login/code',
      '/admin/login/doLogin',
    ];
    if (whiteList.includes(path)) {
      next();
    } else {
      // 获取session 保存的用户信息
      const userinfo = req.session.userinfo;
      if (userinfo && userinfo.username) {
        next();
      } else {
        res.redirect('/admin/login');
      }
    }
  }
}
