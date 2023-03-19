import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../user/entity/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserRepository } from '../user/user.repository';

@Controller('auth')
export class AuthController {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/login')
  @UsePipes(ValidationPipe)
  async signIn(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const jwt = await this.authService.signIn(dto);
    res.cookie('jwtToken', jwt, { httpOnly: true });

    return jwt;
  }

  @Post('/register')
  @UsePipes(ValidationPipe)
  async signUp(@Body() dto: RegisterDto) {
    return await this.authService.signUp(dto);
  }

  @Get('user')
  async getUser(@Req() req: Request) {
    let data: object = {};
    const cookie = req.cookies['jwtToken'];

    try {
      data = await this.jwtService.verifyAsync(cookie['token']);
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }

    if (!data) {
      throw new HttpException('No data in cookies', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userRepository.getById(data['id']);

    const { passwordHash, ...result } = user;

    return result;
  }

  @Post('/forgotPass')
  async forgotPass(@Body() dto: LoginDto) {
    return await this.authService.forgotPass(dto);
  }

  @Post('/logout')
  async logOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwtToken');

    return {
      message: 'success',
    };
  }
}
