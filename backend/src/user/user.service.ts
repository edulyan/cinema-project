import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { User } from './entity/user.entity';
import { UpdUserDto } from './dto/updUser.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers(): Promise<User[]> {
    try {
      return await this.userRepository.getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  async getUserById(id: string): Promise<User> {
    const foundUser = await this.userRepository.getById(id);

    if (!foundUser) {
      throw new HttpException('User no found', HttpStatus.NOT_FOUND);
    }

    return foundUser;
  }

  async getByEmail(email: string): Promise<User> {
    const foundUser = await this.userRepository.getByEmail(email);

    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return foundUser;
  }

  async updUser(
    id: string,
    updUserDto: UpdUserDto,
  ): Promise<UpdateResult | void> {
    await this.getUserById(id);

    return await this.userRepository.update(id, updUserDto);
  }

  async deleteUser(id: string): Promise<boolean> {
    await this.getUserById(id);

    await this.userRepository.delete(id);

    return true;
  }
}
