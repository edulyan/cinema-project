import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CinemaRepository } from './cinema.repository';
import { CreateCinemaDto } from './dto/createCinema.dto';
import { Cinema } from './entity/cinema.entity';
import { IAddRoomCinema } from '../common/interfaces';
import { RoomService } from '../room/room.service';
import { Room } from '../room/entity/room.entity';
import { UpdateCinemaDto } from './dto/updateCinema.dto';
import { CinemaSlug } from '../common/enums';
import { Schedule } from '../schedule/entity/schedule.entity';

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
    const foundCinema = await this.cinemaRepository.getById(id, {
      relations: [
        'schedule.cinema',
        'schedule.movie',
        'schedule.sessions.room',
      ],
    });

    if (!foundCinema) {
      throw new HttpException('Cinema not found', HttpStatus.NOT_FOUND);
    }

    return foundCinema;
  }

  async getBySlug(slug: CinemaSlug): Promise<Cinema> {
    const cinema = await this.cinemaRepository.getBySlug(slug, {
      relations: ['schedule', 'rooms'],
    });

    if (!cinema) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }

    return cinema;
  }

  async getCinemaSchedulesByDate(id: string, date: Date): Promise<Schedule[]> {
    const cinema = await this.getById(id);

    date = new Date(date);

    const schedules = cinema.schedule.filter(
      (schedule: Schedule) =>
        schedule.date.toLocaleDateString() === date.toLocaleDateString() &&
        schedule.sessions.length !== 0,
    );

    return schedules;
  }

  async create(dto: CreateCinemaDto): Promise<Cinema> {
    const newCinema = await this.cinemaRepository.create(dto);

    return await this.cinemaRepository.save(newCinema);
  }

  async update(id: string, dto: UpdateCinemaDto): Promise<boolean> {
    try {
      await this.cinemaRepository.update(id, dto);

      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<boolean> {
    await this.getById(id);

    await this.cinemaRepository.delete(id);

    return true;
  }
}
