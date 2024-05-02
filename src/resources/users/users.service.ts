import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from 'src/auth/dto/login.dto';
import { Repository } from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    if (
      await this.userRepository.findOne({
        where: { email: createUserDTO.email },
      })
    ) {
      throw new BadRequestException(
        `User with email ${createUserDTO.email} already exists`
      );
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDTO.password, salt);
    createUserDTO.password = hashedPassword;
    const userEntity = { ...createUserDTO, apiKey: uuid4() } as User;

    const savedUser = await this.userRepository.save(userEntity);
    delete savedUser.password;
    delete savedUser.secret2FA;
    delete savedUser.enable2FA;
    return savedUser;
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
      { secret2FA: secretKey, enable2FA: true }
    );
  }

  async disable2FA(userId: number) {
    return this.userRepository.update(
      { id: userId },
      { enable2FA: false, secret2FA: null }
    );
  }

  async findOneByApiKey(apiKey: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ apiKey });
    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }
    return user;
  }
}
