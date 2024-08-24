import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
  @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
  
  async findByEmailWithPassword(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role'],
    });
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async getRoleByUserId(id: string) {
    const user = await this.userRepository.findOne({where: {id}});
    return user.roleId;
  }


}
