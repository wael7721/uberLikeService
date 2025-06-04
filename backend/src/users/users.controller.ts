// src/users/users.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { HttpStatus,HttpCode } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';


@Controller('users')
export class UsersController {
  constructor(private authService: AuthService) {}
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    register(@Body() dto: CreateUserDto):Promise<{token:string}> {
        return this.authService.register(dto);
    }
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() dto:LoginUserDto):Promise<{token:string}>{
        return this.authService.login(dto)
    }

}
