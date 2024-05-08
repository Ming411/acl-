import { Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule], // 这个接口需要用到用户模块，所以需要导入
  controllers: [AaaController],
  providers: [AaaService],
})
export class AaaModule {}
