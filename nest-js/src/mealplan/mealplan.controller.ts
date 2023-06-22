import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { MealPlanService } from './mealplan.service';
import { JwtAuthGuard } from 'src/authguard/JwtAuthGuard.service';

// @UseGuards(JwtAuthGuard)
@Controller('meal')
export class MealPlanController {
  constructor(private readonly mealplanService: MealPlanService) {}

  @Get('/list')
  getMealPlanList(
    @Query('last_id') last_id_str: string,
    @Query('limit') limit_str: string,
  ) {
    let last_id = +last_id_str || 0;
    let limit = +limit_str || 10;
    if (limit > 25) {
      limit = 25;
    }
    return this.mealplanService.getMealPlanList({ last_id, limit });
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
