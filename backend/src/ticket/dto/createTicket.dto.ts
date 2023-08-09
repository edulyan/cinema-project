import { IsString } from 'class-validator';
import { IRoomSeat } from '../../common/interfaces';

export class CreateTicketDto {
  @IsString()
  sessionId: string;

  seats: IRoomSeat[];
}
