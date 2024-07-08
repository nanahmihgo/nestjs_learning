import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
require('dotenv').config();


// console.log({ secret: process.env.JWT_SECRET });
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [PrismaService, JwtStrategy, AuthService, UserService],
})
export class AuthModule {}
