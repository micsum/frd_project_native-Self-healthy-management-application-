import { Module } from '@nestjs/common';
import { MealPlanController } from './mealplan.controller';
import { MealPlanService } from './mealplan.service';

@Module({
  controllers: [MealPlanController],
  providers: [MealPlanService],
})
export class MealPlanModule {}
