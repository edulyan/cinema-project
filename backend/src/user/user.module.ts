import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletModule } from '../wallet/wallet.module';
import { Wallet } from '../wallet/entity/wallet.entity';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User, Wallet]), WalletModule, AuthModule],
  exports: [UserService],
})
export class UserModule {}
