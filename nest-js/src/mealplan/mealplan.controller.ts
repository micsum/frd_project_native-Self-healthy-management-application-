import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MealPlanService } from './mealplan.service';
import { JwtAuthGuard } from 'src/authguard/JwtAuthGuard.service';

@UseGuards(JwtAuthGuard)
@Controller('meal')
export class MealPlanController {
  constructor(private readonly mealplanService: MealPlanService) {}

  @Get()
  getMealPlanList() {
    return this.mealplanService.getMealPlanList();
  }

  @Get('/detail/:id')
  getMealPlanDetail(@Param('id') id: number) {
    return this.mealplanService.getMealPlanDetail(id);
  }
  @Post('/scrap')
  scrapMealPlanList() {
    return this.mealplanService.scrapMealPlanList();
  }
}
