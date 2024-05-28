import { SetMetadata } from '@nestjs/common';
// 用来区分哪些接口需要登录权限
export const RequireLogin = () => SetMetadata('require-login', true);
// 用来区分接口需要哪些权限
export const RequirePermission = (...permissions: string[]) =>
  SetMetadata('require-permission', permissions);
