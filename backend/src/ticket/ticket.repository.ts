import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Ticket } from './entity/ticket.entity';
import { Movie } from 'src/movie/entity/movie.entity';

@Injectable()
export class TicketRepository {
  constructor(
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
  ) {}

  async getAll(options?: FindManyOptions) {
    return await this.ticketRepository.find(options);
  }

  async getById(id: string, options?: FindManyOptions<Ticket>) {
    return await this.ticketRepository.findOne({
      where: { id: id },
      ...options,
    });
  }

  async count(options: FindManyOptions) {
    return await this.ticketRepository.count(options);
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
