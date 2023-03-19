import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Session } from '../../session/entity/session.entity';
import { Cinema } from '../../cinema/entity/cinema.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: number;

  @ManyToOne(() => Cinema, (cinema) => cinema.rooms, { onDelete: 'CASCADE' })
  @JoinColumn()
  cinema: Cinema;

  @OneToMany(() => Session, (session) => session.room, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  sessions: Session[];
}
