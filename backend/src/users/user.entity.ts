import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type UserRole = 'passenger' | 'taxi' | 'admin';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone_number: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column()
  password: string;

  @Column({ type: 'varchar' })
  user_role: UserRole;

  @CreateDateColumn()
  created_at: Date;
}