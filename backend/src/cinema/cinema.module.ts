import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaController } from './cinema.controller';
import { CinemaService } from './cinema.service';
import { Cinema } from './entity/cinema.entity';
import { Room } from '../room/entity/room.entity';
import { Schedule } from '../schedule/entity/schedule.entity';
import { CinemaRepository } from './cinema.repository';

@Module({
  controllers: [CinemaController],
  providers: [CinemaService, CinemaRepository],
  exports: [CinemaService, CinemaRepository],
  imports: [TypeOrmModule.forFeature([Cinema, Room, Schedule])],
})
export class CinemaModule {}
