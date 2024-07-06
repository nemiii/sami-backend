import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from './service/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { PublicRoute } from '../decorators/public-route.decorator';


@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @PublicRoute()
  @Post('/register')
  async createUser(@Body() body: RegisterUserDto) {
    return this.userService.registerUser(body);
  }

  @PublicRoute()
  @Post('/login')
  async loginUser(@Body() body: LoginUserDto) {
    return this.userService.loginUser(body);
  }
}
