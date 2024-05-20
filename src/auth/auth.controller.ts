import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from 'src/dto/register.user.dto';
import { UserLoginDto } from 'src/dto/user.login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('register')
    registration(@Body(ValidationPipe) user: RegisterUserDto) {
        return this.authService.registerUser(user);
    }

    @Post('login')
    signin(@Body(ValidationPipe) user: UserLoginDto) {
        return this.authService.login(user);
    }
}
