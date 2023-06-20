// Buffer Line
import { Transform } from 'class-transformer';
import {
  IsString,
  IsDate,
  IsNumberString,
  IsNotEmpty,
  Min,
  IsEnum,
  IsInt,
} from 'class-validator';

export class TargetInputDTO {
  @IsString()
  @IsNotEmpty()
  @IsEnum(['Lose Weight', 'Maintain Weight', 'Gain Weight'])
  targetType: string;

  @IsNumberString()
  @IsNotEmpty()
  @Min(0.01)
  weightTarget: number;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;
}

export class StepGoalDTO {
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  goalInput: string;
}
