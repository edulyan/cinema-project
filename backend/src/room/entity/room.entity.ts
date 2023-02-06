import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IRoomSeat } from '../../common/interfaces';
import { Session } from '../../session/entity/session.entity';
import { Cinema } from '../../cinema/entity/cinema.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: number;

  @Column('polygon', { array: true })
  room_seats: IRoomSeat[][];

  @ManyToOne(() => Cinema, (cinema) => cinema.rooms, { onDelete: 'CASCADE' })
  cinema: Cinema;

  @OneToOne(() => Session, (session) => session.id, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  session: Session;
}
