import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mailer/mailer.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    TypeOrmModule.forFeature([User]),
    forwardRef(() => UserModule),
    MailModule,
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
