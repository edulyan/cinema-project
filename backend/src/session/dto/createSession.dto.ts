import { Room } from '../../room/entity/room.entity';

export class CreateSessionDto {
  readonly sessionTime: Date;
  readonly room: Room;
}
