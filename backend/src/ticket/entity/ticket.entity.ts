import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Session } from '../../session/entity/session.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.tickets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  buyer: User;

  @ManyToOne(() => Session, (session) => session.tickets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  session: Session;
}
