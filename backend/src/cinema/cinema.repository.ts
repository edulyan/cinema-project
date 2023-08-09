import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Cinema } from './entity/cinema.entity';
import { CreateCinemaDto } from './dto/createCinema.dto';
import { UpdateCinemaDto } from './dto/updateCinema.dto';
import { CinemaSlug } from '../common/enums';

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

  async getById(id: string, options?: FindManyOptions<Cinema>) {
    return await this.cinemaRepository.findOne({
      where: { id: id },
      ...options,
    });
  }

  async getBySlug(slug: CinemaSlug, options?: FindManyOptions<Cinema>) {
    return await this.cinemaRepository.findOne({
      where: { slug: slug },
      ...options,
    });
  }

  async create(dto: CreateCinemaDto) {
    return this.cinemaRepository.create(dto);
  }

  async save(entity: Cinema) {
    return await this.cinemaRepository.save(entity);
  }

  async update(id: string, dto: UpdateCinemaDto) {
    return await this.cinemaRepository.update(id, dto);
  }

  async delete(id: string) {
    return await this.cinemaRepository.delete(id);
  }
}
