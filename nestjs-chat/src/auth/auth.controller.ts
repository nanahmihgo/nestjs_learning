import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestWithUser } from './jwt.strategy';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';


// export type AuthBody = { email: string; password: string };
// export type CreateUser = { email: string; name: string; password: string };
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly UserService: UserService) {};
   
    // localhost:8000/auth/register
    @Post('register')
    async register(@Body() registerBody: CreateUserDto) {
        console.log(registerBody);
        return await this.authService.register({ 
            registerBody,
        });
    }

    // localhost:8000/auth/login
    @Post('login')
    async login(@Body() authBody: LoginUserDto) {
        return await this.authService.login({ 
            authBody,
        });
    }

    // localhost:8000/auth/
    @UseGuards(JwtAuthGuard)
    @Get()
    async authenticateUser(@Request() request: RequestWithUser) {
        // console.log(request.user.userId);        
        return await this.UserService.getUser({ userId: request.user.userId });
    }
}

