import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entity/wallet.entity';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  controllers: [WalletController],
  providers: [WalletService],
  imports: [TypeOrmModule.forFeature([Wallet])],
  exports: [WalletService],
})
export class WalletModule {}
