// src/users/users.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { HttpStatus, HttpCode } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.createUser(dto);
  }
  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  findUser(@Param('id') id: string): Promise<User | null> {
    return this.userService.findByIdentifier(id);
  }
}
