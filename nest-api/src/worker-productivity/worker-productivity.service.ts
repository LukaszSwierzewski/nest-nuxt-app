import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateWorkerProductivityDto } from './dto/create-worker-productivity.dto';
import { UpdateWorkerProductivityDto } from './dto/update-worker-productivity.dto';
import { ProductivityOrder } from './entities/worker-productivity.entity';

@Injectable()
export class WorkerProductivityService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(ProductivityOrder) private ProductivityOrderRepository: Repository<ProductivityOrder>,
  ) {}
  async create(createWorkerProductivityDto: CreateWorkerProductivityDto) {
    console.log(createWorkerProductivityDto)
    const newOrder = new ProductivityOrder();
    const userID = await this.usersRepository.findOneOrFail({
      id: createWorkerProductivityDto.user_id
    });
    console.log('xdd')
    newOrder.worker = userID
    newOrder.order_id = 'xdddddddddd'
    return this.ProductivityOrderRepository.save(newOrder)
    
  }

  findAll() {
    return `This action returns all workerProductivity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workerProductivity`;
  }

  update(id: number, updateWorkerProductivityDto: UpdateWorkerProductivityDto) {
    return `This action updates a #${id} workerProductivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} workerProductivity`;
  }
}
