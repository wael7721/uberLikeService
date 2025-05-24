import { IsEmail, IsNotEmpty, MinLength, IsDateString, Length } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class CreateUserDto {
    
  @PrimaryGeneratedColumn()
  id:number;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsNotEmpty()
  @Column({ unique: true }) 
  @Length(8,8,{message:"Phone Number must be 8 digits"})
  phone_number: string;

  @IsDateString()
  dob: string;

  @MinLength(6)
  @Column()
  password: string;

  @IsNotEmpty()
  @Column()
  user_role: 'passenger' | 'taxi';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;
}