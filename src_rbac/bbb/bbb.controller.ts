import { Controller, Get, Post } from '@nestjs/common';
import { BbbService } from './bbb.service';
import { RequireLogin, RequirePermission } from 'src_rbac/custom-decorator';

@Controller('bbb')
@RequireLogin()
export class BbbController {
  constructor(private readonly bbbService: BbbService) {}

  @Post()
  // @UseGuards(LoginGuard) // 请使用全局挂载
  create() {
    return 'This action adds a new bbb';
  }

  @Get()
  @RequirePermission('查询 bbb')
  findAll() {
    return 'This action returns all bbb';
  }
}
