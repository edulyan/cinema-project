import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateTicketDto } from './dto/createTicket.dto';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Get()
  async getAll() {
    return await this.ticketService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.ticketService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async buyTicket(@Body() dto: CreateTicketDto, @Req() req: Request) {
    return await this.ticketService.buyTicket(dto, req);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.ticketService.getById(id);
  }
}
