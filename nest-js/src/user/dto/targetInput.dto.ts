// Buffer Line
import { Transform } from 'class-transformer';
import {
  IsString,
  IsDate,
  IsNumberString,
  IsNotEmpty,
  Min,
  IsEnum,
  IsNumber,
  IsDateString,
  IsInt,
} from 'class-validator';

export class TargetInputDTO {
  @IsString()
  @IsNotEmpty()
  @IsEnum(['Lose Weight', 'Maintain Weight', 'Gain Weight'])
  target_type: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  weight_target: number;

  @IsDateString()
  @IsNotEmpty()
  start_date: Date;

  @IsDateString()
  @IsNotEmpty()
  expected_date: Date;
}

export class StepGoalDTO {
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  goalInput: string;
}
