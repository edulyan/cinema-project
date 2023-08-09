import { IsString } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  readonly scheduleId: string;
}

export interface ISession {
  startTime: Date;
  endTime: Date;
  scheduleId: string;
}
