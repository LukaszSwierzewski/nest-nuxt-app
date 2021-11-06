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
import { request } from 'express';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
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
  @Post('/set/session')
  async postSession (
    @Request() req
  ): Promise<any> {
    const user = await this.usersService.createNewSession(req.body.id, req.cookies['connect.sid']);
    return 'user data updated'
  }
  @Post('/check/session')
  async setSession(
    @Body() sessionDto: sessionTdo,
    @Request() req,
  ): Promise<any> {
    const session = await this.usersService.checkSessionExist('random');
    if (session) {
      console.log(session);
      await this.usersService.updateSessionID(
        session.id,
        req.cookies['connect.sid'],
      )
    } else {
      console.log('no session');
    }
  }
  @Get('/check/me')
  async checkUser(@Request() req): Promise<any> {
    if (req.user) {
      return req.user
    } else {
      return 'User logout'
    }
  }
  @UseGuards(AuthenticatedGuard)
  @Get('/protected/route')
  getHello(@Request() req): string {
    if (req.user) {
      return req.user
    } else {
      return 'loggedout'
    }
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
