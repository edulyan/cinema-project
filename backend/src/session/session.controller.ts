import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateSessionDto } from './dto/createSession.dto';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Get()
  async getAll() {
    return await this.sessionService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.sessionService.getById(id);
  }

  @Post()
  async create(@Body() dto: CreateSessionDto) {
    return await this.sessionService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.sessionService.delete(id);
  }
}
