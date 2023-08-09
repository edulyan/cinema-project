import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ScheduleService } from '../schedule/schedule.service';

@Injectable()
export class VotingScheduler implements OnModuleInit {
  constructor(private readonly scheduleService: ScheduleService) {}

  onModuleInit() {}

  @Cron('59 23 * * 5') // Запускается каждую пятницу в 23:59
  async endVoting() {
    return;
  }
}
