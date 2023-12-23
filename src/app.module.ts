import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { ApiModule } from './module/api/api.module';
import { DefaultModule } from './module/default/default.module';
import { ToolsService } from './service/tools/tools.service';
import { AdminauthMiddleware } from './middleware/adminauth/adminauth.middleware';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://xiaomi:pwd519qxg@192.168.0.102:27017/nestxiaomi?authSource=nestxiaomi',
    ),
    AdminModule,
    ApiModule,
    DefaultModule,
  ],
  controllers: [],
  providers: [ToolsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminauthMiddleware).forRoutes('admin/*');
  }
}
