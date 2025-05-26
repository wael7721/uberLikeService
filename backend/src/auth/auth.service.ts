import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.user_role,
    };

    return this.jwtService.sign(payload);
  }
}