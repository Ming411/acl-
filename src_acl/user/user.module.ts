import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PermissionGuard } from 'src_acl/permission.guard';

@Module({
  controllers: [UserController],
  // 这样就可以在 PermissionGuard 里注入 UserService 了
  providers: [UserService, PermissionGuard],
  exports: [UserService, PermissionGuard],
})
export class UserModule {}
