// Buffer Line
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MealItemService } from './meal-item.service';
import { CreateMealItemDto } from './dto/create-meal-item.dto';
import { UpdateMealItemDto } from './dto/update-meal-item.dto';

@Controller('mealItem')
export class MealItemController {
  constructor(private readonly mealItemService: MealItemService) {}

  @Get(':date')
  @UsePipes(new ValidationPipe())
  async retrieveMealItems(@Param('date') date: Date) {
    console.log(date);
    return {};
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async addNewItem(@Body() foodItemBasicInfo: CreateMealItemDto) {
    console.log(foodItemBasicInfo);
    return {};
  }

  @Put()
  @UsePipes(new ValidationPipe())
  async updateItem(@Body() foodItemFullInfo: UpdateMealItemDto) {
    console.log(foodItemFullInfo);
    return {};
  }

  @Delete()
  @UsePipes(new ValidationPipe())
  async deleteItem(@Body() foodItemBasicInfo: CreateMealItemDto) {
    console.log(foodItemBasicInfo);
    return {};
  }
}
