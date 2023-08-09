import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Between, DataSource } from 'typeorm';
import { subDays } from 'date-fns';
import { SessionService } from '../session/session.service';
import { ScheduleRepository } from './schedule.repository';
import { CreateScheduleDto } from './dto/createSchedule.dto';
import { CinemaRepository } from '../cinema/cinema.repository';
import { MovieRepository } from '../movie/movie.repository';
import { Schedule } from './entity/schedule.entity';
import { Movie } from '../movie/entity/movie.entity';
import { Ticket } from '../ticket/entity/ticket.entity';
import { CalculateScheduleDto } from './dto/calculateSchedule';
import { IPopularFilm } from '../common/interfaces';

@Injectable()
export class ScheduleService {
  constructor(
    private scheduleRepository: ScheduleRepository,
    private movieRepository: MovieRepository,
    private cinemaRepository: CinemaRepository,
    private dataSource: DataSource,
    private sessionService: SessionService,
  ) {}

  async getAll(): Promise<Schedule[]> {
    try {
      return await this.scheduleRepository.getAll({
        relations: ['cinema', 'movie', 'sessions'],
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getById(id: string): Promise<Schedule> {
    const schedule = await this.scheduleRepository.getById(id, {
      relations: ['cinema', 'movie', 'sessions'],
    });

    if (!schedule) {
      throw new HttpException('Schedule not found', HttpStatus.NOT_FOUND);
    }

    return schedule;
  }

  async create(dto: CreateScheduleDto): Promise<boolean> {
    try {
      let schedule: Schedule = null;
      const movies = await this.movieRepository.getAll();
      const cinemas = await this.cinemaRepository.getAll();

      for (let i = 0; i < cinemas.length; i++) {
        for (let j = 0; j < movies.length; j++) {
          schedule = await this.scheduleRepository.create(dto);
          schedule.movie = movies[j];
          schedule.cinema = cinemas[i];
          await this.scheduleRepository.save(schedule);
        }
      }

      return true;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async calculateSchedule(dto: CalculateScheduleDto) {
    const movies = await this.movieRepository.getAll({
      relations: ['tickets'],
    });

    const popularFilms: IPopularFilm[] = await Promise.all(
      movies.map(async (movie: Movie) => {
        const soldTickets = await this.dataSource
          .getRepository(Ticket)
          .createQueryBuilder('ticket')
          .select('COUNT')
          .leftJoin('ticket.movie', 'movie')
          .where('movie.id = :movieId', {
            movieId: movie.id,
          })
          .andWhere('ticket.createdAt BETWEEN :start AND :end', {
            start: subDays(new Date(), 2),
            end: new Date(),
          })
          .getCount();

        return { movie, soldTickets };
      }),
    );

    const schedules = await this.scheduleRepository.getAll({
      where: {
        date: Between(dto.startDate, dto.endDate),
      },
      relations: ['sessions', 'movie'],
    });

    popularFilms
      .sort((a, b) => b.soldTickets - a.soldTickets)
      .map(async ({ movie }) => {
        const foundSchedules = schedules.filter(
          (schedule: Schedule) => schedule.movie.id === movie.id,
        );

        for (let i = 0; i < foundSchedules.length; i++) {
          await this.sessionService.create({
            scheduleId: foundSchedules[i].id,
          });
        }
      });

    return true;
  }

  async delete(id: string): Promise<boolean> {
    await this.getById(id);

    await this.scheduleRepository.delete(id);

    return true;
  }
}
