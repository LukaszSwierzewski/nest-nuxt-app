import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const validPassword = await bcrypt.compare(password, user.password);
    console.log(validPassword)
    if (user && validPassword) {
      const { password, ...rest } = user;
      return rest;
    } else {
      return 'Wrong password or username. Try again';
    }
  }
}
