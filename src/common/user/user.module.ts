import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { UserService } from './service/user.service';
import { User } from './entities/user.entity';
import { SnAccount } from './entities/sn-account.entity';
import { AppConfigService } from '../../app-config/app-config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, SnAccount]),
    JwtModule.registerAsync({
      useFactory: async (appConfigService: AppConfigService) => ({
        secret: appConfigService.jwtSecret,
        signOptions: {
          expiresIn: '72h',
        },
      }),
      inject: [AppConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
