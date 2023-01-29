import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigPG } from './config/orm.config';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
    WalletModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
