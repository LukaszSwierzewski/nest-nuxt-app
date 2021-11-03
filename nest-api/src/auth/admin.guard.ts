import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
@Injectable()
export class AdminAuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request.isAuthenticated && request.user && request.user.isAdmin) {
      return request.isAuthenticated();
    }
  }
}
