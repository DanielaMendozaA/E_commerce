import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';




@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
  ) {}

  async generateToken(user: any){
    const payload = { id: user.id, email: user.email, roleId: user.roleId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

    validateUser(payload: any){
    return { id: payload.id, email: payload.email, roleId: payload.roleId };
  }

  async validateUserCredentials(email: string, password: string){
    const user = await this.usersService.findOneByEmail(email);
    if(user){
      const isPasswordMatching = await this.comparePasswords(password, user.password);
      if(isPasswordMatching){
        return user;
      }
    }
    throw new UnauthorizedException('Invalid email or password');
  }
  
  async hashPassword(password: string): Promise<string>{
    const salt = await bcrypt.genSalt(this.configService.get('SALT_ROUNDS'));
    return bcrypt.hash(password, salt);

  }


  async comparePasswords(password: string, hashedPassword: string): Promise<boolean>{
    return bcrypt.compare(password, hashedPassword);
  }

  async register({ password, email, username}: RegisterDto){
    const user = await this.usersService.findOneByEmail(email);
    if(user) throw new BadRequestException('User already exists');
    const roleId = "6d44bc8d-e208-4dbd-84f3-1356275493b7";
    const hashedPassword = await this.hashPassword(password);
    const newUser = {
      email,
      password: hashedPassword,
      username,
      roleId
    }
    await this.usersService.create(newUser);

    return { message: 'User created successfully', newUser };
  
  }

  async login({ email, password }){
    const user = await this.validateUserCredentials(email, password);
    if(!user) throw new UnauthorizedException('Invalid email or password');
    const payload = this.validateUser(user);
    const token = await this.generateToken(payload);
    return { message: 'Login successful', token, email: user.email};
  }



}
