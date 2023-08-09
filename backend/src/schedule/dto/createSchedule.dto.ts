import { IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  date: Date;
}
