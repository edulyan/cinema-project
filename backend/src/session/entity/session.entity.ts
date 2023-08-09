import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from '../../room/entity/room.entity';
import { IRoomSeat } from '../../common/interfaces';
import { Ticket } from '../../ticket/entity/ticket.entity';
import { Schedule } from '../../schedule/entity/schedule.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column('simple-json', { array: false })
  room_seats: IRoomSeat[];

  @ManyToOne(() => Schedule, (schedule) => schedule.sessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  schedule: Schedule;

  @ManyToOne(() => Room, (room) => room.sessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  room: Room;

  @OneToMany(() => Ticket, (ticket) => ticket.session, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  tickets: Ticket[];
}
