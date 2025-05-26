import { UseGuards, Controller, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './decorator/get-user.decorator';
import { User as UserEntity } from 'src/users/user.entity';
@Controller('profile')
export class ProfileController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getProfile(@User() user:UserEntity) {
    return user;
  }
}