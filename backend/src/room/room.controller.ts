import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateRoomDto } from './dto/room.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async getAll() {
    return await this.roomService.getAll();
  }

  @Get('id')
  async getRoomById(@Param('id') id: string) {
    return await this.roomService.findRoomById(id);
  }

  @Post()
  async createRoom(@Body() dto: CreateRoomDto) {
    return await this.roomService.createRoom(dto);
  }

  @Delete('id')
  async deleteRoom(@Param('id') id: string) {
    return await this.roomService.deleteRoom(id);
  }
}
