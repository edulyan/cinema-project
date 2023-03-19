import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CinemaRepository } from './cinema.repository';
import { CreateCinemaDto } from './dto/createCinema.dto';
import { Cinema } from './entity/cinema.entity';

@Injectable()
export class CinemaService {
  constructor(private cinemaRepository: CinemaRepository) {}

  async getAll(): Promise<Cinema[]> {
    try {
      return await this.cinemaRepository.getAll();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getById(id: string): Promise<Cinema> {
    const foundCinema = await this.cinemaRepository.getById(id);

    if (!foundCinema) {
      throw new HttpException('Cinema not found', HttpStatus.NOT_FOUND);
    }

    return foundCinema;
  }

  async create(dto: CreateCinemaDto): Promise<Cinema> {
    const newCinema = await this.cinemaRepository.create(dto);

    return await this.cinemaRepository.save(newCinema);
  }

  async delete(id: string): Promise<boolean> {
    await this.getById(id);

    await this.cinemaRepository.delete(id);

    return true;
  }
}
