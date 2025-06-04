import { User } from '../users/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto} from '../users/dto/create-user.dto'
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // Inject UsersService here
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto): Promise<{ token: string }> {
    const user = await this.usersService.createUser(dto);
    const token = this.generateToken(user);
    return { token };
  }
  async login(dto: LoginUserDto): Promise<{ token: string }> {
    const user = await this.usersService.findByIdentifier(dto.identifier);
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user);
    return { token };
  }
  generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.user_role,
    };

    return this.jwtService.sign(payload);
  }
}
