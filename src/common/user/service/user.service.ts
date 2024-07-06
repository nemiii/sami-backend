import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { GeneralException } from '../../exception/general.exception';
import { ApiErrorMessages } from '../../api-errors';
import { comparePassword } from '../../helpers/bcrypt';
import { RegisterUserDto } from '../dto/register-user.dto';
import { SnAccount } from '../entities/sn-account.entity';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(SnAccount)
    private readonly pcAccountRepository: Repository<SnAccount>,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(body: RegisterUserDto) {
    const { email } = body;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new GeneralException(ApiErrorMessages.UserAlreadyExists);
    }

    const pcAccount = await this.pcAccountRepository.insert([
      {
        isBlocked: false,
      },
    ]);

    const newUser = new User();
    newUser.email = email;
    newUser.snAccountId = pcAccount.identifiers[0].id;

    const createdUser = await this.userRepository.save(newUser);

    return createdUser;
  }

  async loginUser(body: LoginUserDto) {
    const { email, password } = body;
    this.logger.log(`User login | ${email}`);
    const user = await this.userRepository.findOne({
      where: { email: email.trim() },
    });
    if (!user) {
      throw new GeneralException(ApiErrorMessages.InvalidCredentials);
    }

    const isPasswordValid: boolean = await comparePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new GeneralException(ApiErrorMessages.InvalidCredentials);
    }

    const jwtToken = await this.jwtService.sign({ userId: user.id });

    return { jwtToken };
  }

  async getUserById(userId: number) {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['pcAccount'],
    });
  }
}
