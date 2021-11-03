import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
export class sessionTdo extends PartialType(CreateUserDto) {
  id?: number;
}
