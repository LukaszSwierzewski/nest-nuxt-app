import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class AppService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
  }
  getAll(): Promise<User[]> {
    return this.usersRepository.find(); 
  }
  async getOneById(id: number): Promise<User> {
    try {
    const user = await this.usersRepository.findOneOrFail(id)
    return user;
    } catch (err) {
      throw err;
    }
  }
  createUser(name: string, email: string): Promise<User> {
    const newUser = this.usersRepository.create({name, email})
    return this.usersRepository.save(newUser)
  }


  getHello(): string {
    return 'Hello World!';
  }
}
