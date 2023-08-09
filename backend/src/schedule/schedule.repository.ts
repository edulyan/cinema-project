import { NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Schedule } from './entity/schedule.entity';
import { CreateScheduleDto } from './dto/createSchedule.dto';

export class ScheduleRepository {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async find(options?: FindManyOptions<Schedule>) {
    return await this.scheduleRepository.find(options);
  }

  async getAll(options?: FindManyOptions<Schedule>) {
    return await this.scheduleRepository.find(options);
  }

  async getById(id: string, options?: FindManyOptions<Schedule>) {
    return await this.scheduleRepository.findOne({
      where: { id: id },
      ...options,
    });
  }

  async create(dto: CreateScheduleDto) {
    return this.scheduleRepository.create(dto);
  }

  async save(entity: Schedule) {
    return await this.scheduleRepository.save(entity);
  }

  async delete(id: string) {
    return await this.scheduleRepository.delete(id);
  }
}
