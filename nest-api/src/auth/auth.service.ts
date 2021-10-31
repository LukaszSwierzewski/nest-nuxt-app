import { Injectable } from '@nestjs/common';
import { request } from 'express';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}
    async validateUser (username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username)
        if (user && user.password === password) {
            const { password, ...rest}  = user
            return rest
        } else {
            return 'Wrong password or username'
        }
    }
    async validateCookie (cookie: string): Promise<any> {
        console.log(request)
    }

}
