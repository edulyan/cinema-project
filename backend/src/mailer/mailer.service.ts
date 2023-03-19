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
        text: `Congratulations, you have successfully registered on our website!
            
            Your account details:
            
            login: ${email}
            password: ${password}`,
      })
      .catch((e) => {
        throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async forgotPassMail(email: string): Promise<void> {
    await this.mailerService
      .sendMail({
        to: email,
        subject: 'Changing the password',
        text: `Your password has been changed!`,
      })
      .catch((e) => {
        throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  //To finish
  async buyTicket() {}
}
