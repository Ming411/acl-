import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { LoginGuard } from 'src/login.guard';
import { PermissionGuard } from 'src/permission.guard';

@Controller('aaa')
export class AaaController {
  constructor(private readonly aaaService: AaaService) {}

  @Post()
  @UseGuards(LoginGuard)
  create(@Body() createAaaDto: CreateAaaDto) {
    return this.aaaService.create(createAaaDto);
  }

  @Get()
  @UseGuards(LoginGuard, PermissionGuard)
  @SetMetadata('permission', 'query_aaa') // 提供给PermissionGuard使用
  // 表示这个接口不仅需要登录，还需要有额外的权限才能访问
  findAll() {
    return this.aaaService.findAll();
  }

  @Get(':id')
  @UseGuards(LoginGuard)
  findOne(@Param('id') id: string) {
    return this.aaaService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(LoginGuard)
  update(@Param('id') id: string, @Body() updateAaaDto: UpdateAaaDto) {
    return this.aaaService.update(+id, updateAaaDto);
  }

  @Delete(':id')
  @UseGuards(LoginGuard)
  remove(@Param('id') id: string) {
    return this.aaaService.remove(+id);
  }
}
