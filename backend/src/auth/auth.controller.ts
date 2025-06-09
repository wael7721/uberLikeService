import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
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
