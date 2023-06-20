// Buffer Line
import {
  IsString,
  IsDate,
  IsNumberString,
  IsNotEmpty,
  Min,
  IsEnum,
  IsNumber,
  IsDateString,
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
