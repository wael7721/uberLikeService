// src/users/users.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { HttpStatus,HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    register(@Body() dto: CreateUserDto):Promise<{token:string}> {
        return this.usersService.createUser(dto);
    }
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() dto:LoginUserDto):Promise<{token:string}>{
        return this.usersService.loginUser(dto)
    }

}
