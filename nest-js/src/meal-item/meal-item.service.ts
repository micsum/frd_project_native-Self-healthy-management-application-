// Buffer Line
import { Injectable } from '@nestjs/common';
import { CreateMealItemDto } from './dto/create-meal-item.dto';
import { UpdateMealItemDto } from './dto/update-meal-item.dto';

@Injectable()
export class MealItemService {
  create(createMealItemDto: CreateMealItemDto) {
    return 'This action adds a new mealItem';
  }

  findAll() {
    return `This action returns all mealItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mealItem`;
  }

  update(id: number, updateMealItemDto: UpdateMealItemDto) {
    return `This action updates a #${id} mealItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} mealItem`;
  }
}
