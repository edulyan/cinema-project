import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/createCinema.dto';

@Controller('cinema')
export class CinemaController {
  constructor(private cinemaService: CinemaService) {}

  @Get()
  async getAll() {
    return await this.cinemaService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.cinemaService.getById(id);
  }

  @Post()
  async create(@Body() dto: CreateCinemaDto) {
    return await this.cinemaService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.cinemaService.delete(id);
  }
}
