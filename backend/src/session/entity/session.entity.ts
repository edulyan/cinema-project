import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from '../../room/entity/room.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  sessionTime: Date;

  @OneToOne(() => Room, (room) => room.id, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  room: Room;
}
