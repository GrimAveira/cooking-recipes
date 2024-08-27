import { Module } from '@nestjs/common';
import { CookingStageController } from './cooking-stage.controller';
import { CookingStageService } from './cooking-stage.service';

@Module({
  controllers: [CookingStageController],
  providers: [CookingStageService]
})
export class CookingStageModule {}
