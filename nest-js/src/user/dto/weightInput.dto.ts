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

export class WeightInfoDTO {
  @IsNumberString()
  @IsNotEmpty()
  weight: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;
}
