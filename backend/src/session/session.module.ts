import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { Session } from './entity/session.entity';
import { SessionRepository } from './session.repository';
import { Schedule } from '../schedule/entity/schedule.entity';
import { ScheduleRepository } from '../schedule/schedule.repository';

@Module({
  controllers: [SessionController],
  providers: [SessionService, SessionRepository, ScheduleRepository],
  exports: [SessionService, SessionRepository],
  imports: [TypeOrmModule.forFeature([Session, Schedule])],
})
export class SessionModule {}
