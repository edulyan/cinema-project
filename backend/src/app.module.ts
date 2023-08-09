import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailerModule } from '@nestjs-modules/mailer';
import { dataSourceOptions } from 'db/data-source';
import { MailModule } from './mailer/mailer.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoomModule } from './room/room.module';
import { SessionModule } from './session/session.module';
import { CinemaModule } from './cinema/cinema.module';
import { MovieModule } from './movie/movie.module';
import { ScheduleModule } from './schedule/schedule.module';
import { TicketModule } from './ticket/ticket.module';
import { FileModule } from './file/file.module';
import { VoteModule } from './vote/vote.module';
import MailConfig from './config/mailer.config';
import * as path from 'path';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
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
    FileModule,
    VoteModule,
  ],
})
export class AppModule {}
