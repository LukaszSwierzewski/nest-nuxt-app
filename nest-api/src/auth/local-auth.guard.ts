import { AuthGuard } from '@nestjs/passport';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../users/users.service';
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private usersService: UsersService) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}
