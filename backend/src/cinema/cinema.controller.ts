import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/createCinema.dto';
import { IAddRoomCinema } from '../common/interfaces';
import { UpdateCinemaDto } from './dto/updateCinema.dto';
import { CinemaSlug } from '../common/enums';

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

  @Get('bySlug/:slug')
  async getBySlug(@Param('slug') slug: CinemaSlug) {
    return await this.cinemaService.getBySlug(slug);
  }

  @Get('schedules/:id')
  async getMovieSchedulesByDate(
    @Param('id') id: string,
    @Query('date') date: Date,
  ) {
    return await this.cinemaService.getCinemaSchedulesByDate(id, date);
  }

  @Post()
  async create(@Body() dto: CreateCinemaDto) {
    return await this.cinemaService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCinemaDto) {
    return await this.cinemaService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.cinemaService.delete(id);
  }
}
