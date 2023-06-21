import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { JwtAuthGuard } from 'src/authguard/JwtAuthGuard.service';

// @UseGuards(JwtAuthGuard)
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Get('/list')
  getWorkoutList(
    @Query('last_id') last_id_str: string,
    @Query('limit') limit_str: string,
  ) {
    let last_id = +last_id_str || 0;
    let limit = +limit_str || 10;
    if (limit > 25) {
      limit = 25;
    }
    return this.workoutService.getWorkoutList({ last_id, limit });
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
