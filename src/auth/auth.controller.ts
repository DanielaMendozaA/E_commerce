import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() user: RegisterDto) {
    return await this.authService.register(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

}
