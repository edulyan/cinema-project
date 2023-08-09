import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { MovieService } from '../movie/movie.service';
import { UserService } from '../user/user.service';
import { Vote } from './entity/vote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteDto } from './dto/vote.dto';

@Injectable()
export class VoteService {
  constructor(
    private readonly movieService: MovieService,
    private readonly userService: UserService,
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
  ) {}

  async makeVote({ movieId }: VoteDto, req: Request) {
    try {
      const user = await this.userService.getById(req['user'].id);
      const movie = await this.movieService.getById(movieId);

      const vote = this.voteRepository.create();

      vote.user = user;
      vote.movie = movie;

      await this.voteRepository.save(vote);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
