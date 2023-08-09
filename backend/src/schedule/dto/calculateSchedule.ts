import { IsDate, IsString } from 'class-validator';

export class CalculateScheduleDto {
  @IsString()
  startDate: Date;

  @IsString()
  endDate: Date;
}
