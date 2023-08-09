import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { MailService } from '../mailer/mailer.service';
import { UserRepository } from '../user/user.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async signIn({ email, password }: LoginDto) {
    const foundUser = await this.userRepository.getByEmail(email);

    if (!foundUser) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const passCompare = await compare(password, foundUser.passwordHash);

    if (!passCompare) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      access_token: await this.jwtService.signAsync({
        id: foundUser.id,
        role: foundUser.role,
      }),
    };
  }

  async signUp(dto: RegisterDto) {
    const foundUser = await this.userRepository.getByEmail(dto.email);

    if (foundUser) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = await this.userRepository.create(dto);

    return {
      email: newUser.email,
    };
  }

  async forgotPass({ email, password }: LoginDto): Promise<boolean> {
    const foundUser = await this.userRepository.getByEmail(email);

    const hashPass = await hash(password, 5);

    foundUser.passwordHash = hashPass;

    await this.mailService.forgotPassMail(email);

    await this.userRepository.save(foundUser);

    return true;
  }
}
