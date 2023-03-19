import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoomRepository } from '../room/room.repository';
import { SessionRepository } from './session.repository';

import { IRoomSeat } from '../common/interfaces';
import { CreateSessionDto } from './dto/createSession.dto';
import { Session } from './entity/session.entity';

@Injectable()
export class SessionService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly roomRepository: RoomRepository,
  ) {}

  async getAll(): Promise<Session[]> {
    try {
      return await this.sessionRepository.getAll();
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

  async create(dto: CreateSessionDto): Promise<Session> {
    try {
      const foundRoom = await this.roomRepository.getById(dto.roomId);

      if (!foundRoom) {
        throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
      }

      const resRoom: Array<IRoomSeat> = [];
      const rows = [1, 2, 3, 4, 5];
      const columns = [1, 2, 3, 4, 5, 6];

      for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < columns.length; j++) {
          resRoom.push({ row: rows[i], column: columns[j], sold: false });
        }
      }

      const createSession = await this.sessionRepository.create(dto);

      createSession.room = foundRoom;
      createSession.room_seats = resRoom;

      return this.sessionRepository.save(createSession);
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string): Promise<boolean> {
    (await this.getById(id)) ?? false;

    await this.sessionRepository.delete(id);

    return true;
  }
}
