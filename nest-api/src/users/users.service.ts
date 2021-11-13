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
    const afterLoginCookie = await this.sessionRepository.create({'session_cookie': 'secret_random'})
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
    const afterLoginCookie = new Session ();
    afterLoginCookie.session_cookie = cookie
    afterLoginCookie.session_user = userUpdated
    return this.sessionRepository.save(afterLoginCookie)
  }
  async findUsername (username: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({username})
    if (!user) {
      return false
    }
    return true
  }
  async findEmail (email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({email})
    if (user) {
      return true
    }
    return false
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
  async updateSessionID(id: number, session_cookie: any): Promise<any> {
    await this.sessionRepository.update(+id, {
        session_cookie
      });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
