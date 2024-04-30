import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from 'src/auth/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    if (
      await this.userRepository.findOne({
        where: { email: createUserDTO.email },
      })
    ) {
      throw new BadRequestException(
        `User with email ${createUserDTO.email} already exists`,
      );
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDTO.password, salt);
    createUserDTO.password = hash;
    const user = await this.userRepository.save(createUserDTO);
    delete user.password;
    delete user.secret2FA;
    delete user.enable2FA;
    return user;
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }
    return user;
  }

  async findOne(loginDTO: LoginDTO /* Partial<User> */): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: loginDTO.email });
    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }
    return user;
  }

  async updateSecretKey(userId: number, secretKey: string) {
    if (!this.userRepository.findOneBy({ id: userId })) {
      throw new UnauthorizedException('Could not find user');
    }
    return this.userRepository.update(
      { id: userId },
      { secret2FA: secretKey, enable2FA: true },
    );
  }

  async disable2FA(userId: number) {
    return this.userRepository.update(
      { id: userId },
      { enable2FA: false, secret2FA: null },
    );
  }
}
