import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { UserModule } from '../user/user.module';
import { MovieModule } from '../movie/movie.module';
import { AuthModule } from '../auth/auth.module';
import { Vote } from './entity/vote.entity';
import { User } from '../user/entity/user.entity';
import { Movie } from '../movie/entity/movie.entity';

@Module({
  controllers: [VoteController],
  providers: [VoteService],
  exports: [VoteService],
  imports: [
    TypeOrmModule.forFeature([Vote, User, Movie]),
    UserModule,
    MovieModule,
    AuthModule,
  ],
})
export class VoteModule {}
