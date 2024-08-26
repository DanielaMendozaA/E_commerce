import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { RolesModule } from 'src/roles/roles.module';
import { LoggerService } from 'src/common/errors';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]), 
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' }
      }),
    }),
    UsersModule,
    RolesModule,
    CommonModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService, JwtGuard, RolesGuard, LoggerService],
  exports: [AuthService]
})
export class AuthModule {}
