import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('id')
  async getRoomById(@Param('id') id: string) {
    return await this.roomService.findRoomById(id);
  }

  @Post()
  async createRoom() {
    return await this.roomService.createRoom();
  }

  @Delete('id')
  async deleteRoom(@Param('id') id: string) {
    return await this.roomService.deleteRoom(id);
  }
}
