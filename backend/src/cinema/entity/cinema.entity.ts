import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from '../../room/entity/room.entity';
import { Schedule } from '../../schedule/entity/schedule.entity';

@Entity()
export class Cinema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => Room, (room) => room.cinema, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  rooms: Room[];

  @OneToMany(() => Schedule, (schedule) => schedule.cinema, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  schedule: Schedule[];
}
