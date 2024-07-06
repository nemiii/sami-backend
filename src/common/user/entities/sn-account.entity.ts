import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from './user.entity';
  
  @Entity({ name: 'sn_account' })
  export class SnAccount {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ default: false, type: 'boolean' })
    isBlocked!: boolean;
  
    @OneToMany(() => User, (user) => user.snAccount)
    users!: User[];
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  
    @DeleteDateColumn()
    deletedAt!: Date;
  }
  