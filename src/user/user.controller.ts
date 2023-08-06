import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserDataDTO } from './model/user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  createUser(
    @Body() data: UserDataDTO) {
    return this.userService.createUser(data);
  }

  // NEEDS AUTH

  @Get('/:id')
  @UseGuards(AuthGuard)
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() data: UserDataDTO) {
    return this.userService.updateUser(data, id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
