import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsDefined()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  password!: string;
}
