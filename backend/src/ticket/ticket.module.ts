import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { SessionModule } from '../session/session.module';
import { Session } from '../session/entity/session.entity';
import { Ticket } from './entity/ticket.entity';
import { User } from '../user/entity/user.entity';
import { TicketRepository } from './ticket.repository';
import { MovieModule } from '../movie/movie.module';

@Module({
  controllers: [TicketController],
  providers: [TicketService, TicketRepository],
  exports: [TicketRepository],
  imports: [
    TypeOrmModule.forFeature([Ticket, User, Session]),
    UserModule,
    SessionModule,
    MovieModule,
    AuthModule,
  ],
})
export class TicketModule {}
