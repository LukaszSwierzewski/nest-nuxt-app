import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkerProductivityDto } from './create-worker-productivity.dto';

export class UpdateWorkerProductivityDto extends PartialType(CreateWorkerProductivityDto) {}
