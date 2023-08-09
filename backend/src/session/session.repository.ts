import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateSessionDto, ISession } from './dto/createSession.dto';
import { Session } from './entity/session.entity';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
  ) {}

  async getAll(options?: FindManyOptions<Session>) {
    return await this.sessionRepository.find(options);
  }

  async getById(id: string, options?: FindManyOptions<Session>) {
    return await this.sessionRepository.findOne({
      where: { id: id },
      ...options,
    });
  }

  async create(dto: ISession) {
    return this.sessionRepository.create(dto);
  }

  async save(entity: Session) {
    return await this.sessionRepository.save(entity);
  }

  async delete(id: string) {
    return await this.sessionRepository.delete(id);
  }
}
