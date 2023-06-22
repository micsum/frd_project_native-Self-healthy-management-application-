import { Controller, Get, Post } from '@nestjs/common';
import { WorkoutService } from './workout.service';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Get()
  getWorkoutList() {
    return this.workoutService.getWorkoutList();
  }

  @Post('/scrap')
  scrapWorkoutList() {
    return this.workoutService.scrapWorkoutList();
  }
}
