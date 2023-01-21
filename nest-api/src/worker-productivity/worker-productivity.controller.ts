import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkerProductivityService } from './worker-productivity.service';
import { CreateWorkerProductivityDto } from './dto/create-worker-productivity.dto';
import { UpdateWorkerProductivityDto } from './dto/update-worker-productivity.dto';

@Controller('worker-productivity')
export class WorkerProductivityController {
  constructor(private readonly workerProductivityService: WorkerProductivityService) {}

  @Post()
  create(@Body() createWorkerProductivityDto: CreateWorkerProductivityDto) {
    return this.workerProductivityService.create(createWorkerProductivityDto);
  }

  @Get()
  findAll() {
    return this.workerProductivityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workerProductivityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkerProductivityDto: UpdateWorkerProductivityDto) {
    return this.workerProductivityService.update(+id, updateWorkerProductivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workerProductivityService.remove(+id);
  }
}
