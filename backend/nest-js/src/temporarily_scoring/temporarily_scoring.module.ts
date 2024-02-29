import { Module } from "@nestjs/common";
import { TemporarilyScoringService } from "./temporarily_scoring.service";

@Module({
	providers: [TemporarilyScoringService],
	exports: [TemporarilyScoringService],
})
export class TemporarilyScoringModule {}
