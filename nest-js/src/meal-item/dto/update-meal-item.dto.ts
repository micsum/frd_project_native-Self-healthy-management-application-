// Buffer Line
import { PartialType } from '@nestjs/mapped-types';
import { CreateMealItemDto } from './create-meal-item.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class UpdateMealItemDto extends PartialType(CreateMealItemDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  meal_id: number;

  @IsNotEmpty()
  @IsEnum(['breakfast', 'lunch', 'dinner', 'snack'])
  meal_time: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  calories: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  serving_size_g: number;

  @IsNotEmpty()
  @IsEnum(['g', 'kg', 'lb'])
  saved_size_unit: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  fat_total_g: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  fat_saturated_g: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  protein_g: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  sodium_mg: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  potassium_mg: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  cholesterol_mg: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  carbohydrates_total_g: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  fiber_g: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  sugar_g: number;
}
