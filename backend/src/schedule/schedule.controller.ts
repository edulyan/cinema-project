import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/createSchedule.dto';
import { CalculateScheduleDto } from './dto/calculateSchedule';

@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get()
  async getAll() {
    return await this.scheduleService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.scheduleService.getById(id);
  }

  @Post()
  async create(@Body() dto: CreateScheduleDto) {
    return this.scheduleService.create(dto);
  }

  @Post('calculateSchedule')
  async calculateSchedule(@Body() dto: CalculateScheduleDto) {
    return await this.scheduleService.calculateSchedule(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.scheduleService.delete(id);
  }
}
