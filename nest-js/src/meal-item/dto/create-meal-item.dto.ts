// Buffer Line
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateMealItemDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  meal_id: number;

  @IsNotEmpty()
  @IsEnum({
    enum: {
      mealType: ['breakfast', 'lunch', 'dinner', 'snack'],
    },
  })
  meal_time: string;

  @IsNotEmpty()
  @IsString()
  foodName: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  servingSize: number;

  @IsNotEmpty()
  @IsEnum({ enum: { units: ['g', 'kg', 'lb'] } })
  sizeUnit: string;
}
