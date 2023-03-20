import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UpdUserDto } from './dto/updUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.getById(id);
  }

  @Put(':id')
  async updUser(@Param('id') id: string, @Body() updUserDto: UpdUserDto) {
    return await this.userService.updUser(id, updUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
