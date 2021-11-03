import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { sessionTdo } from './dto/session-user.dto';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { AdminAuthenticatedGuard } from '../auth/admin.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  username: string;
  email: string;
  password: string;
  @Get()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create({username: "someeeUser", email: 'haba@o2.pl', password: "asd"});
    return this.login(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    return req.user;
  }
  @Post('/check/session')
  async setSession(
    @Body() sessionDto: sessionTdo,
    @Request() req,
  ): Promise<any> {
    await this.usersService.updateSessionID(
      sessionDto.id,
      req.cookies['connect.sid'],
    );
    return 'request done';
  }
  @Get('/check/me')
  async checkUser(@Request() req): Promise<any> {
    if (req.cookies['connect.sid']) {
      const user = await this.usersService.findUserByCookie(
        req.cookies['connect.sid'],
      );
      const { password, ...rest } = user;
      return rest;
    } else {
      return new UnauthorizedException();
    }
  }
  @UseGuards(AuthenticatedGuard)
  @Get('/protected/route')
  getHello(): string {
    return 'from protected route';
  }
  @UseGuards(AdminAuthenticatedGuard)
  @Get('/protected/admin')
  getAdmin(): string {
    return 'from admin protected route';
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
