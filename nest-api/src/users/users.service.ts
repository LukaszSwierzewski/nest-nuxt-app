import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { sessionTdo } from './dto/session-user.dto';
import { request } from 'express';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
  }
  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto)
    return this.usersRepository.save(newUser)
  }

  findAll() {
    const allUsers = this.usersRepository.find()
    return allUsers
  }


  findOne(username: string) {
    const oneUser = this.usersRepository.findOneOrFail({username})
    return oneUser
  }
  async findUserByCookie(session_id: string): Promise<any> {
    const oneUser = this.usersRepository.findOneOrFail({session_id})
    return oneUser
  }

  async updateSessionID(id: number, data: any) {
    await this.usersRepository.update(+id, {
      'session_id': data
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
