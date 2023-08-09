import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CreateRoomDto } from './dto/room.dto';
import { Room } from './entity/room.entity';

@Injectable()
export class RoomRepository {
  constructor(
    @InjectRepository(Room) private roomrepository: Repository<Room>,
  ) {}

  async getAll(options?: FindManyOptions) {
    return await this.roomrepository.find(options);
  }

  async getAllBy(options?: FindOptionsWhere<Room>) {
    return await this.roomrepository.findBy(options);
  }

  async getById(id: string, options?: FindManyOptions<Room>) {
    return await this.roomrepository.findOne({ where: { id: id }, ...options });
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
