// car.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  plateNumber: string;

  @Column()
  passengerCapacity: number;

  @Column({ default: 'taxi' })
  role: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  owner: User; // this will store the user's id internally as ownerId
}   
