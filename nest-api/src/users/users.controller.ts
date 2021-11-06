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
  Response,
  HttpException,
  GoneException,
  HttpStatus
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

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.login(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Post('/logout')
  async logout(@Request() req, @Response() res) {
    req.logout();
    res.status(200).clearCookie('connect.sid', {
      path: '/'
    });
    req.session.destroy( (err) => {
      res.redirect('/'); 
  });
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
    const user = await this.usersService.createNewSession(req.user.id, req.cookies['connect.sid']);
    return user
  }
  @Post('/check/session')
  async setSession(
    @Body() sessionDto: sessionTdo,
    @Request() req,
  ): Promise<any> {
    const session = await this.usersService.checkSessionExist('secret_random');
    if (session) {
      await this.usersService.updateSessionID(
        session.id,
        req.cookies['connect.sid'],
        req.user.id
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
      return new GoneException()
    }
  }
  @UseGuards(AuthenticatedGuard)
  @Get('/protected/account')
  async getHello(@Request() req): Promise<any> {
    if (req.user) {
      return req.user
    } else {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Zaloguj się aby mieć dostęp do ustawień konta',
      }, HttpStatus.FORBIDDEN);
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
