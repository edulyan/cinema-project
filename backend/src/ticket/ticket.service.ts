import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TicketRepository } from './ticket.repository';
import { UserService } from '../user/user.service';
import { SessionService } from '../session/session.service';
import { CreateTicketDto } from './dto/createTicket.dto';
import { Ticket } from './entity/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  async getAll(): Promise<Ticket[]> {
    return await this.ticketRepository.getAll();
  }

  async getById(id: string): Promise<Ticket> {
    const foundTicket = await this.ticketRepository.getById(id);

    if (!foundTicket) {
      throw new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
    }

    return foundTicket;
  }

  async create({ userId, sessionId }: CreateTicketDto): Promise<Ticket> {
    const foundUser = await this.userService.getById(userId);
    const foundSession = await this.sessionService.getById(sessionId);

    const newTicket = await this.ticketRepository.create();

    newTicket.buyer = foundUser;
    newTicket.session = foundSession;

    return await this.ticketRepository.save(newTicket);
  }

  async delete(id: string): Promise<boolean> {
    await this.getById(id);

    await this.ticketRepository.delete(id);

    return true;
  }
}
