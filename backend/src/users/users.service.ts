import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const exists = await this.usersRepository.findOne({
      where: [{ email: dto.email }, { phone_number: dto.phone_number }],
    });
    if (exists) {
      throw new BadRequestException('Email or phone number already registered');
    }

    const dob = new Date(dto.dob);
    if (dob >= new Date()) {
      throw new BadRequestException('Date of birth must be in the past');
    }

    const hashedPassword = await bcrypt.hash(
      dto.password,
      await bcrypt.genSalt(),
    );

    const user = this.usersRepository.create({
      ...dto,
      dob,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  async findByIdentifier(identifier: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: [{ email: identifier }, { phone_number: identifier }],
    });
  }

  async findByNumber(identifier: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: [{ id: identifier }],
    });
  }
}
