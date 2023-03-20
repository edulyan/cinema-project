import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entity/ticket.entity';

@Injectable()
export class TicketRepository {
  constructor(
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
  ) {}

  async getAll() {
    return await this.ticketRepository.find({
      relations: ['buyer', 'session'],
    });
  }

  async getById(id: string) {
    return await this.ticketRepository.findOne({
      where: { id: id },
      relations: ['buyer', 'session'],
    });
  }

  async create() {
    return this.ticketRepository.create();
  }

  async save(entity: Ticket) {
    return await this.ticketRepository.save(entity);
  }

  async delete(id: string) {
    return await this.ticketRepository.delete(id);
  }
}
