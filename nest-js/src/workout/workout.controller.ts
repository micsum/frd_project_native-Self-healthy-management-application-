import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { JwtAuthGuard } from 'src/authguard/JwtAuthGuard.service';

@UseGuards(JwtAuthGuard)
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Get()
  getWorkoutList() {
    return this.workoutService.getWorkoutList();
  }

  @Get('/detail/:id')
  getWorkoutDetail(@Param('id') id: number) {
    return this.workoutService.getWorkoutDetail(id);
  }

  @Post('/scrap')
  scrapWorkoutList() {
    return this.workoutService.scrapWorkoutList();
  }
}
