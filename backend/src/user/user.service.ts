import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entity/user.entity';
import { WalletService } from '../wallet/wallet.service';
import { UpdUserDto } from './dto/updUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private walletService: WalletService,
  ) {}

  async getUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new HttpException('User no found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(userDto);

    const createWallet = await this.walletService.createWallet();
    newUser.wallet = createWallet;

    return await this.userRepository.save(newUser);
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
