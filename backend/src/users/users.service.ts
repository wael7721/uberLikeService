import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private authService: AuthService, // Inject AuthService
  ) {}

  async createUser(dto: CreateUserDto): Promise<{token:string}> {
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

    const token = this.authService.generateToken(user);

    return { token };
  }
  async loginUser(dto: LoginUserDto): Promise<{ token: string }> {
    const user = await this.usersRepository.findOne({
      where: [{ email: dto.identifier }, { phone_number: dto.identifier }],
    });

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.authService.generateToken(user);

    return { token };
  }
}
