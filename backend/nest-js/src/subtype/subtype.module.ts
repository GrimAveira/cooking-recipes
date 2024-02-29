import { Module } from '@nestjs/common';
import { SubtypeController } from './subtype.controller';
import { SubtypeService } from './subtype.service';

@Module({
  controllers: [SubtypeController],
  providers: [SubtypeService]
})
export class SubtypeModule {}
