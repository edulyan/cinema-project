import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import { UpdUserDto } from './dto/updUser.dto';

export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsers() {
    return await this.userRepository.find();
  }

  async getById(id: string) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async create(dto: RegisterDto) {
    const newUser = this.userRepository.create(dto);

    return await this.userRepository.save(newUser);
  }

  async save(user: User) {
    return await this.userRepository.save(user);
  }

  async update(id: string, dto: UpdUserDto) {
    return await this.userRepository.update(id, dto);
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }
}
