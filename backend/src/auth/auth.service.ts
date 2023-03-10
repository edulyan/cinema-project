import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/entity/user.entity';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { UserService } from '../user/user.service';
import { MailService } from '../mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private userService: UserService,
    private mailService: MailService,
  ) {}

  async signIn(authDto: AuthDto) {
    const useR = await this.userRepository.findOne({
      where: { email: authDto.email },
    });

    if (!useR) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passCompare = await bcrypt.compare(authDto.password, useR.password);

    if (!passCompare) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.jwtService.signAsync({
      id: useR.id,
      role: useR.role,
    });

    const { password, ...user } = useR;

    return {
      user,
      token,
    };
  }

  async signUp(userDto: CreateUserDto) {
    const email = await this.userRepository.findOne({
      where: { email: userDto.email },
    });

    if (email) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const hashPass = await bcrypt.hash(userDto.password, 5);

    const data = await this.userService.createUser({
      ...userDto,
      password: hashPass,
    });

    const token = this.jwtService.sign({ id: data.id, role: data.role });

    const { password, ...user } = data;

    await this.mailService.signUpMail({ ...data, password: userDto.password });

    return {
      user,
      token,
    };
  }

  async forgotPass(authDto: AuthDto) {
    const user = await this.userService.getByEmail(authDto.email);

    const hashPass = await bcrypt.hash(authDto.password, 5);

    user.password = hashPass;

    await this.mailService.forgotPassMail(authDto);

    return await this.userRepository.save(user);
  }
}
