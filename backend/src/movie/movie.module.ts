import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieRepository } from './movie.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entity/movie.entity';
import { Schedule } from '../schedule/entity/schedule.entity';

@Module({
  controllers: [MovieController],
  providers: [MovieService, MovieRepository],
  imports: [TypeOrmModule.forFeature([Movie, Schedule])],
})
export class MovieModule {}
