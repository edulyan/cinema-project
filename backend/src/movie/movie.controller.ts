import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/createMovie.dto';
import { MovieService } from './movie.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { IGetAllReq } from './interfaces/getAll.interface';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getAll(@Query() dto?: IGetAllReq) {
    return await this.movieService.getAll(dto);
  }

  @Get('featureMovies')
  async getFeatureMovies() {
    return await this.movieService.getFeatureMovies();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.movieService.getById(id);
  }

  @Get('bySlug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return await this.movieService.getBySlug(slug);
  }

  @Get('schedules/:id')
  async getMovieSchedulesByDate(
    @Param('id') id: string,
    @Query('date') date: Date,
  ) {
    return await this.movieService.getMovieSchedulesByDate(id, date);
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'trailer', maxCount: 1 },
    ]),
  )
  async create(@UploadedFiles() files, @Body() dto: CreateMovieDto) {
    return await this.movieService.create(
      dto,
      files.image[0],
      files.trailer[0],
    );
  }

  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'imgVert', maxCount: 1 }]))
  async addImgVert(@Param('id') id: string, @UploadedFiles() files) {
    return await this.movieService.addImgVert(id, files.imgVert[0]);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.movieService.delete(id);
  }
}
