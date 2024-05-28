import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  @Inject(JwtService)
  private jwtService: JwtService;

  constructor(private readonly userService: UserService) {}

  @Get('init')
  async initData() {
    await this.userService.initData();
    return 'done';
  }

  @Post('login')
  async login(@Body() loginUser: UserLoginDto) {
    const user = await this.userService.login(loginUser);
    // console.log(user);
    // 把 user 信息放到 jwt 里，然后返回
    const token = this.jwtService.sign({
      user: {
        username: user.username,
        roles: user.roles,
      },
    });
    return {
      token,
    };
  }
}
