import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/createSession.dto';
import { Session } from './entity/session.entity';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
  ) {}

  async getAll() {
    return await this.sessionRepository.find();
  }

  async getById(id: string) {
    return await this.sessionRepository.findOne({ where: { id: id } });
  }

  async create(dto: CreateSessionDto) {
    return this.sessionRepository.create(dto);
  }

  async save(entity: Session) {
    return await this.sessionRepository.save(entity);
  }

  async delete(id: string) {
    return await this.sessionRepository.delete(id);
  }
}
