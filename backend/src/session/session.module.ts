import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { RoomModule } from '../room/room.module';
import { Session } from './entity/session.entity';
import { Room } from '../room/entity/room.entity';
import { SessionRepository } from './session.repository';
import { Ticket } from '../ticket/entity/ticket.entity';

@Module({
  controllers: [SessionController],
  providers: [SessionService, SessionRepository],
  exports: [SessionService],
  imports: [TypeOrmModule.forFeature([Session, Room, Ticket]), RoomModule],
})
export class SessionModule {}
