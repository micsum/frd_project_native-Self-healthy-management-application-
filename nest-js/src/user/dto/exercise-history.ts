import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsString,
  MIN_DATE,
  MinDate,
} from 'class-validator';

export class ExHistDTO {
  @IsNotEmpty()
  @IsString()
  event_name: string;

  @IsNotEmpty()
  @IsDateString()
  start_time: Date;

  @IsNotEmpty()
  @IsDateString()
  end_time: Date;
}
