import { IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  userId: string;

  @IsString()
  sessionId: string;
}
