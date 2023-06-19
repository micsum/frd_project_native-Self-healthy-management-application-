// Buffer Line
import {
  IsString,
  IsDate,
  IsNumberString,
  IsNotEmpty,
  Min,
  IsEnum,
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
