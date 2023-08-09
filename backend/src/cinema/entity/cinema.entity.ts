import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from '../../room/entity/room.entity';
import { Schedule } from '../../schedule/entity/schedule.entity';
import { CinemaSlug } from '../../common/enums';

@Entity()
export class Cinema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ type: 'simple-array' })
  subway: string[];

  @Column({
    unique: true,
    type: 'enum',
    enum: CinemaSlug,
  })
  slug: CinemaSlug;

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
