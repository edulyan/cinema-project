import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { MailModule } from './mailer/mailer.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { RoomModule } from './room/room.module';
import { SessionModule } from './session/session.module';
import { CinemaModule } from './cinema/cinema.module';
import { MovieModule } from './movie/movie.module';
import { ScheduleModule } from './schedule/schedule.module';
import MailConfig from './config/mailer.config';

@Module({
  controllers: [],
  providers: [],
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    MailerModule.forRoot(MailConfig),
    UserModule,
    AuthModule,
    WalletModule,
    MailModule,
    RoomModule,
    SessionModule,
    CinemaModule,
    MovieModule,
    ScheduleModule,
  ],
})
export class AppModule {}
