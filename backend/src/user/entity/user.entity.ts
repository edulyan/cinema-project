import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { UserRole } from '../../common/enums';
import { Ticket } from '../../ticket/entity/ticket.entity';
import { Vote } from '../../vote/entity/vote.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @OneToMany(() => Ticket, (ticket) => ticket.buyer, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  tickets: Ticket[];

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;

  @BeforeInsert()
  async setPassword() {
    const salt = await genSalt(10);

    this.passwordHash = await hash(this.passwordHash, salt);
  }
}
