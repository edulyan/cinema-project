import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TicketRepository } from './ticket.repository';
import { UserService } from '../user/user.service';
import { CreateTicketDto } from './dto/createTicket.dto';
import { Ticket } from './entity/ticket.entity';
import { SessionRepository } from '../session/session.repository';
import { MovieRepository } from 'src/movie/movie.repository';
import { IRoomSeat } from '../common/interfaces';

@Injectable()
export class TicketService {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly userService: UserService,
    private readonly sessionRepository: SessionRepository,
    private readonly movieRepository: MovieRepository,
  ) {}

  async getAll(): Promise<Ticket[]> {
    return await this.ticketRepository.getAll({ relations: ['movie'] });
  }

  async getById(id: string): Promise<Ticket> {
    const foundTicket = await this.ticketRepository.getById(id);

    if (!foundTicket) {
      throw new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
    }

    return foundTicket;
  }

  async buyTicket({ sessionId, seats }: CreateTicketDto, req: Request) {
    try {
      const user = await this.userService.getById(req['user'].id);
      const session = await this.sessionRepository.getById(sessionId, {
        relations: ['schedule.movie'],
      });

      session.room_seats.forEach((roomSeat: IRoomSeat) => {
        const matchingUpdatedSeat = seats.find(
          (updatedSeat: IRoomSeat) =>
            updatedSeat.row === roomSeat.row &&
            updatedSeat.column === roomSeat.column,
        );

        if (matchingUpdatedSeat) {
          roomSeat.sold = true;
        }
      });

      console.log(session);

      const newTicket = await this.ticketRepository.create();

      newTicket.movie = session.schedule.movie;
      newTicket.buyer = user;
      newTicket.session = session;
      newTicket.seats = seats;

      await this.sessionRepository.save(session);

      return await this.ticketRepository.save(newTicket);
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<boolean> {
    await this.getById(id);

    await this.ticketRepository.delete(id);

    return true;
  }
}
