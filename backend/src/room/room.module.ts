import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Room } from './entity/room.entity';
import { Cinema } from '../cinema/entity/cinema.entity';
import { Session } from '../session/entity/session.entity';

@Module({
  controllers: [RoomController],
  providers: [RoomService],
  imports: [TypeOrmModule.forFeature([Room, Cinema, Session])],
})
export class RoomModule {}
