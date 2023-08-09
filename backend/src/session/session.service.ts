import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SessionRepository } from './session.repository';
import { IRoomSeat } from '../common/interfaces';
import { CreateSessionDto } from './dto/createSession.dto';
import { Session } from './entity/session.entity';
import { ScheduleRepository } from '../schedule/schedule.repository';
import { findAvailableRooms } from './helpers/filterRoom';
import { setEndTime, setStartTimeDefault } from './helpers/setTime';

@Injectable()
export class SessionService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly scheduleRepository: ScheduleRepository,
  ) {}

  async getAll(): Promise<Session[]> {
    try {
      return await this.sessionRepository.getAll({ relations: ['schedule'] });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getById(id: string): Promise<Session> {
    const foundSession = await this.sessionRepository.getById(id);

    if (!foundSession) {
      throw new HttpException('Session not found', HttpStatus.NOT_FOUND);
    }

    return foundSession;
  }

  async create({ scheduleId }: CreateSessionDto) {
    try {
      const foundSchedule = await this.scheduleRepository.getById(scheduleId, {
        relations: ['cinema.rooms.sessions', 'movie', 'sessions'],
      });

      const startTime = setStartTimeDefault(foundSchedule);
      const endTime = setEndTime(foundSchedule, startTime);

      const availableRooms = findAvailableRooms(foundSchedule, startTime);

      if (!availableRooms) {
        return;
      }

      const resRoom: Array<IRoomSeat> = [];
      const rows = [1, 2, 3, 4, 5];
      const columns = [1, 2, 3, 4, 5, 6];

      for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < columns.length; j++) {
          resRoom.push({
            row: rows[i],
            column: columns[j],
            sold: false,
            price: 400,
          });
        }
      }

      const createSession = await this.sessionRepository.create({
        startTime,
        endTime,
        scheduleId,
      });

      createSession.room = availableRooms[0];
      createSession.room_seats = resRoom;

      foundSchedule.sessions.push(createSession);
      await this.scheduleRepository.save(foundSchedule);

      return this.sessionRepository.save(createSession);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<boolean> {
    (await this.getById(id)) ?? false;

    await this.sessionRepository.delete(id);

    return true;
  }
}
