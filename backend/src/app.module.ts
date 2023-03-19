import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { MailModule } from './mailer/mailer.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { RoomModule } from './room/room.module';
import { SessionModule } from './session/session.module';
import { CinemaModule } from './cinema/cinema.module';
import { MovieModule } from './movie/movie.module';
import { ScheduleModule } from './schedule/schedule.module';
import { TicketModule } from './ticket/ticket.module';
import MailConfig from './config/mailer.config';

@Module({
  controllers: [],
  providers: [],
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    MailerModule.forRoot(MailConfig),
    UserModule,
    AuthModule,
    MailModule,
    RoomModule,
    SessionModule,
    CinemaModule,
    MovieModule,
    ScheduleModule,
    TicketModule,
  ],
})
export class AppModule {}
