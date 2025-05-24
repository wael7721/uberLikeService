import { Injectable,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

// interface CreateUserResult {
//   success: boolean;
//   user?: User;
//   error?: string;
// }

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const existing = await this.usersRepository.findOne({ where: [{ email: dto.email },{phone_number: dto.phone_number}] });
    if (existing) {
      if(existing.email===dto.email){
        throw new BadRequestException('Email already registered');}
      if(existing.phone_number===dto.phone_number){
        throw new BadRequestException('Phone number already registered');
      }
    }

    // Validate DOB (basic: must be in the past)
    const dob = new Date(dto.dob);
    if (dob >= new Date()) {
      throw new BadRequestException('Date of birth must be in the past');
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const user = this.usersRepository.create({
      ...dto,
      dob,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  /*async createUserSafe(dto: CreateUserDto): Promise<CreateUserResult> {
  try {
    const exists = await this.usersRepo.findOne({
      where: [{ email: dto.email }, { phone_number: dto.phone_number }],
    });
    if (exists) {
      return { success: false, error: 'Email or phone number already registered' };
    }

    const dob = new Date(dto.dob);
    if (dob >= new Date()) {
      return { success: false, error: 'Date of birth must be in the past' };
    }

    const hashedPassword = await bcrypt.hash(dto.password, await bcrypt.genSalt());

    const user = this.usersRepo.create({
      ...dto,
      dob,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepo.save(user);
    return { success: true, user: savedUser };
  } catch (error) {
    // Log error if needed
    return { success: false, error: 'Unexpected error occurred' };
  }
} */ 
}
