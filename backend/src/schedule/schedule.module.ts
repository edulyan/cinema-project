import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { Schedule } from './entity/schedule.entity';
import { Cinema } from '../cinema/entity/cinema.entity';
import { Session } from '../session/entity/session.entity';
import { ScheduleRepository } from './schedule.repository';
import { MovieModule } from '../movie/movie.module';
import { CinemaModule } from '../cinema/cinema.module';
import { SessionModule } from '../session/session.module';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleRepository],
  exports: [ScheduleRepository],
  imports: [
    TypeOrmModule.forFeature([Schedule, Cinema, Session]),
    MovieModule,
    CinemaModule,
    SessionModule,
  ],
})
export class ScheduleModule {}
