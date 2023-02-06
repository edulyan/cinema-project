import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRoomSeat } from 'src/common/interfaces';
import { Repository } from 'typeorm';
import { Room } from './entity/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {}

  async findRoomById(id: string): Promise<Room> {
    const room = await this.roomRepository.findOneBy({ id: id });

    if (!room) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }

    return room;
  }

  async createRoom(): Promise<IRoomSeat[][]> {
    const resRoom: Array<IRoomSeat>[] = [];
    const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    for (let i = 0; i < rows.length; i++) {
      resRoom.push([]);
      for (let j = 0; j < columns.length; j++) {
        resRoom[i].push({ row: rows[i], column: columns[j], sold: false });
      }
    }

    return resRoom;
  }

  async deleteRoom(id: string): Promise<boolean> {
    (await this.findRoomById(id)) || false;

    await this.roomRepository.delete(id);

    return true;
  }
}
