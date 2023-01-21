import { Module } from '@nestjs/common';
import { WorkerProductivityService } from './worker-productivity.service';
import { WorkerProductivityController } from './worker-productivity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/users/entities/user.entity';
import { ProductivityOrder } from './entities/worker-productivity.entity';

@Module({
  controllers: [WorkerProductivityController],
  providers: [WorkerProductivityService],
  imports: [TypeOrmModule.forFeature([User, ProductivityOrder])],

})
export class WorkerProductivityModule {}
