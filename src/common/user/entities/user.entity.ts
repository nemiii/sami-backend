import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserStatus } from '../enums/user-status.enum';
import { SnAccount } from './sn-account.entity';
import { BaseEntity } from '../../entities/base.entity';

@Entity({ name: 'user_' })
export class User extends BaseEntity {
  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  timeZone: string;

  @Column()
  firstName!: string;

  @Column({ default: false })
  isVerified!: boolean;

  @Column({ default: false })
  isOnboard!: boolean;

  @Column()
  lastName!: string;

  @Column()
  phone!: string;

  @Column({ enum: UserStatus, default: UserStatus.ACTIVE })
  status!: UserStatus;

  @ManyToOne(() => SnAccount, (snAccount) => snAccount.users)
  snAccount!: SnAccount;

  @Column()
  snAccountId!: number;
}
