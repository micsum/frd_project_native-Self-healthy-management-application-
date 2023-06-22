import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { JwtAuthGuard } from 'src/authguard/JwtAuthGuard.service';

@Module({
  controllers: [WorkoutController],
  providers: [WorkoutService, JwtAuthGuard],
  exports: [WorkoutService],
})
export class WorkoutModule {}
