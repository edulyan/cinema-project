import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/room.dto';
import { Room } from './entity/room.entity';

@Injectable()
export class RoomRepository {
  constructor(
    @InjectRepository(Room) private roomrepository: Repository<Room>,
  ) {}

  async getAll() {
    return await this.roomrepository.find({
      relations: ['cinema', 'sessions'],
    });
  }

  async getById(id: string) {
    return await this.roomrepository.findOne({ where: { id: id } });
  }

  async create(dto: CreateRoomDto) {
    return this.roomrepository.create(dto);
  }

  async save(entity: Room) {
    return await this.roomrepository.save(entity);
  }

  async delete(id: string) {
    return await this.roomrepository.delete(id);
  }
}
