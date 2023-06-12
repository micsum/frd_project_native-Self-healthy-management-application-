import { Controller, Get, Param, Post } from '@nestjs/common';
import { WorkoutService } from './workout.service';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Get()
  getWorkoutList() {
    console.log('received the request of getting workout list');
    return this.workoutService.getWorkoutList();
  }

  @Get('/detail/:id')
  getWorkoutDetail(@Param('id') id: number) {
    console.log('received the request of getting workout detail');
    return this.workoutService.getWorkoutDetail(id);
  }

  @Post('/scrap')
  scrapWorkoutList() {
    return this.workoutService.scrapWorkoutList();
  }
}
