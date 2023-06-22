import { Module } from '@nestjs/common';
import { MealPlanModule } from 'src/mealplan/mealplan.module';
import { WorkoutModule } from 'src/workout/workout.module';
import { PlanController } from './plan.controller';

@Module({
  imports: [WorkoutModule, MealPlanModule],
  controllers: [PlanController],
})
export class PlanModule {}
