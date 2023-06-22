import { Controller, Get } from '@nestjs/common';
import { MealPlanService } from 'src/mealplan/mealplan.service';
import { WorkoutService } from 'src/workout/workout.service';

@Controller('plan')
export class PlanController {
  constructor(
    private readonly workoutService: WorkoutService,
    private readonly mealPlanService: MealPlanService,
  ) {}

  // @Get('overview-list')
  // async getOverviewList(offset: number) {
  //   return {
  //     workoutPlans: await this.workoutService.getWorkoutList(offset),
  //     mealPlans: await this.mealPlanService.getMealPlanList(),
  //   };
  // }
}
