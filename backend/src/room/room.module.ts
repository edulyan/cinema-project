import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { CinemaModule } from '../cinema/cinema.module';
import { Room } from './entity/room.entity';
import { Cinema } from '../cinema/entity/cinema.entity';
import { Session } from '../session/entity/session.entity';
import { RoomRepository } from './room.repository';

@Module({
  controllers: [RoomController],
  providers: [RoomService, RoomRepository],
  exports: [RoomService, RoomRepository],
  imports: [TypeOrmModule.forFeature([Room, Cinema, Session]), CinemaModule],
})
export class RoomModule {}
