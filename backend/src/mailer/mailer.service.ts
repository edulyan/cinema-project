import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from '../auth/dto/login.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async signUpMail({ email, password }: LoginDto): Promise<void> {
    await this.mailerService
      .sendMail({
        to: email,
        subject: 'Registration',
        text: `Поздравляю, вы зарегестрировались в нашем приложении
            
            Ваши данные:
            
            Логин: ${email}
            Пароль: ${password}`,
      })
      .catch((e) => {
        throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async forgotPassMail(email: string): Promise<void> {
    await this.mailerService
      .sendMail({
        to: email,
        subject: 'Поменять пароль',
        text: `Ваш пароль был изменен`,
      })
      .catch((e) => {
        throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  //To finish
  async buyTicket() {}
}
