import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Session } from './entities/session.entity';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.usersRepository.create(createUserDto);
    const randomID = String(Math.random() * 1000)
    const randomUserID = Math.random() * 1000
    const afterLoginCookie = await this.sessionRepository.create({'session_cookie': 'secret_random', 'user_id': randomUserID})
    await this.sessionRepository.save(afterLoginCookie)
    newUser.sessions = [afterLoginCookie]
    return this.usersRepository.save(newUser);
  }
  async createNewSession(id: string, cookie: any): Promise<any> {
    const userUpdated = await this.usersRepository.findOneOrFail(id)
    const currentSessionExist = await this.findOneSession(cookie)

    if (currentSessionExist !== undefined) {
      return
    }

    const afterLoginCookie = await this.sessionRepository.create({'session_cookie': cookie, 'user_id': userUpdated.id})
    userUpdated.sessions = await this.findAllSession(userUpdated.id)
    await userUpdated.sessions.push(afterLoginCookie)
    
    return this.usersRepository.save(userUpdated)
  }
  async findAllSession(userId: number): Promise<any> {
    const session = await this.sessionRepository.find({
      relations: ['session_user'],
      loadRelationIds: true,
      where: {
        session_user: userId
      }
    })
    return session
  }
  findAll() {
    const allUsers = this.usersRepository.find();
    return allUsers;
  }
  async findOneSession(session_cookie: string): Promise<Session> {
    const oneSession = await this.sessionRepository.findOne({session_cookie})
    return oneSession
  }
  findOne(username: string) {
    const oneUser = this.usersRepository.findOneOrFail({ username });
    return oneUser;
  }
  async findUserByCookie(session_cookie: string): Promise<any> {
    const oneUser = await this.sessionRepository.findOneOrFail({session_cookie}, {
      relations: ['session_user']
    });
    const userData = oneUser.session_user 
    const {password, ...rest} = userData
    return rest;
  }
  async checkSessionExist(session_cookie: string): Promise<Session> {
    const foundSession = this.sessionRepository.findOneOrFail({ session_cookie });
    return foundSession;
  }
  async updateSessionID(id: number, session_cookie: any, user_id): Promise<any> {
    await this.sessionRepository.update(+id, {
        session_cookie,
        user_id
      });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
