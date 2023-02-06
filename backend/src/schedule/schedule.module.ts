import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entity/schedule.entity';
import { Cinema } from '../cinema/entity/cinema.entity';
import { Session } from '../session/entity/session.entity';

@Module({
  providers: [ScheduleService],
  controllers: [ScheduleController],
  imports: [TypeOrmModule.forFeature([Schedule, Cinema, Session])],
})
export class ScheduleModule {}
