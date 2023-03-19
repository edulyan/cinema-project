import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCinemaDto } from './dto/createCinema.dto';
import { Cinema } from './entity/cinema.entity';

@Injectable()
export class CinemaRepository {
  constructor(
    @InjectRepository(Cinema) private cinemaRepository: Repository<Cinema>,
  ) {}

  async getAll() {
    return await this.cinemaRepository.find({
      relations: ['rooms', 'schedule'],
    });
  }

  async getById(id: string) {
    return await this.cinemaRepository.findOne({
      where: { id: id },
      relations: ['rooms', 'schedule'],
    });
  }

  async create(dto: CreateCinemaDto) {
    return this.cinemaRepository.create(dto);
  }

  async save(entity: Cinema) {
    return await this.cinemaRepository.save(entity);
  }

  async delete(id: string) {
    return await this.cinemaRepository.delete(id);
  }
}
