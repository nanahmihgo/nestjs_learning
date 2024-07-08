import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
// import { AuthBody } from './auth.controller';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './jwt.strategy';
import { isEmpty } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';


@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}
    
    async register({ registerBody }: { registerBody: CreateUserDto }) {
        const{ email, name, password } = registerBody;

        // if (!email || !password) {
        //     throw new Error('Email and password are required');
        //   }
      
        const hashedPassword = await this.hashPassword({ password });

        const existingUser = await this.prisma.user.findUnique({
            where: {
              email,
            },
          });

        if (existingUser) {
        throw new Error('Already existing user');
        }

        const createdUser = await this.prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            }
        });

        if (createdUser) {
            throw new Error('Already existing user');
        }

        return await this.authenticateUser({ userId: createdUser.id });
    }

    async login({ authBody }: { authBody: LoginUserDto }) {
       
        const{email, password} = authBody;
        
        const currentUser = await this.prisma.user.findUnique({
            where: {
                email,
            }
        });

        if (!currentUser) {
            throw new Error('User not found');
        }

        const isPasswordValid = await this.isPasswordValid({
            password,
            hashedPassword: currentUser.password
        })

        // console.log(password, currentUser.password);
        

        if (!isPasswordValid) {
            throw new Error('Wrong password');
        }

        return await this.authenticateUser({ userId: currentUser.id });
    }

    private async hashPassword({ password }: { password: string }) {
        const hashedPassword = await hash(password, 10);
        
        return hashedPassword;
    }

    private async isPasswordValid({ 
        password, 
        hashedPassword 
    }: { 
        password: string, 
        hashedPassword: string 
    }) {
        const isPasswordValid = await compare(password, hashedPassword);
        return isPasswordValid;
    }

    private async authenticateUser({ userId }: UserPayload) {
        const payload: UserPayload = { userId };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}