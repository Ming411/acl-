import { RedisService } from './redis/redis.service';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserService } from './user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(Reflector)
  private reflector: Reflector;

  @Inject(RedisService)
  private redisService: RedisService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const user = request.session.user;
    if (!user) {
      throw new UnauthorizedException('用户未登录');
    }

    // 先从redis中获取用户权限，如果存在则直接返回，不存在则从数据库中查询并存入redis中
    let permissions = await this.redisService.listGet(
      `user_${user.username}_permissions`,
    );

    if (permissions.length === 0) {
      const foundUser = await this.userService.findByUsername(user.username);
      permissions = foundUser.permissions.map((item) => item.name);

      // 将用户权限存入redis中
      this.redisService.listSet(
        `user_${user.username}_permissions`,
        permissions,
        60 * 30,
      );
    }

    const permission = this.reflector.get('permission', context.getHandler());
    // reflector.get() 获取装饰器中传入的参数，在具体的方法中配置需要的权限
    if (permissions.some((item) => item === permission)) {
      return true;
    } else {
      throw new UnauthorizedException('没有权限访问该接口');
    }
  }
}
