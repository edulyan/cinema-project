import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { Session } from '../session/entity/session.entity';
import { Ticket } from './entity/ticket.entity';

@Module({
  controllers: [TicketController],
  providers: [TicketService],
  exports: [],
  imports: [TypeOrmModule.forFeature([Ticket, Session])],
})
export class TicketModule {}
