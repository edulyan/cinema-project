import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateMovieDto } from './dto/createMovie.dto';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.movieService.getById(id);
  }

  @Post()
  async create(@Body() dto: CreateMovieDto) {
    return await this.movieService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.movieService.delete(id);
  }
}
