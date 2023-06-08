import { Controller, Get, Post } from '@nestjs/common';
import { MealPlanService } from './mealplan.service';

@Controller('meal')
export class MealPlanController {
  constructor(private readonly mealplanService: MealPlanService) {}

  @Get()
  getMealPlanList() {
    return this.mealplanService.getMealPlanList();
  }

  @Post('/scrap')
  scrapMealPlanList() {
    return this.mealplanService.scrapMealPlanList();
  }
}
