import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { VoteDto } from './dto/vote.dto';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  constructor(private voteService: VoteService) {}

  @UseGuards(JwtAuthGuard)
  @Post('makeVote')
  async makeVote(@Body() dto: VoteDto, @Req() req: Request) {
    return await this.voteService.makeVote(dto, req);
  }
}
