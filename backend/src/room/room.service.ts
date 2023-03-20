import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoomRepository } from './room.repository';
import { CinemaRepository } from '../cinema/cinema.repository';
import { CreateRoomDto } from './dto/room.dto';
import { Room } from './entity/room.entity';

@Injectable()
export class RoomService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly cinemaRepository: CinemaRepository,
  ) {}

  async getAll(): Promise<Room[]> {
    try {
      return await this.roomRepository.getAll();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: string): Promise<Room> {
    const room = await this.roomRepository.getById(id);

    if (!room) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }

    return room;
  }

  async createRoom(dto: CreateRoomDto): Promise<Room> {
    const foundCinema = await this.cinemaRepository.getById(dto.cinemaId);

    if (!foundCinema) {
      throw new HttpException('Cinema not found', HttpStatus.NOT_FOUND);
    }

    const newRoom = await this.roomRepository.create(dto);

    newRoom.cinema = foundCinema;

    return await this.roomRepository.save(newRoom);
  }

  async deleteRoom(id: string): Promise<boolean> {
    await this.findById(id);

    await this.roomRepository.delete(id);

    return true;
  }
}
