import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Post()
  async create(@Body() dto: CreateTicketDto) {
    return await this.ticketService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.ticketService.getById(id);
  }
}
