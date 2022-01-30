import { Module, Global } from '@nestjs/common';
import { ComplainService } from './complains.service';

@Global()
@Module({
 controllers: [],
 providers: [ComplainService],
 exports: [ComplainService],
})
export class ComplainModule {}