import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsEmail()
  email!: string;
}
