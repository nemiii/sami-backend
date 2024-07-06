import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('port');
  }

  get snEnv(): string {
    return this.configService.get<string>('pcEnv');
  }

  get dbUrl(): string {
    return this.configService.get<string>('dbUrl');
  }

  get dbPort(): number {
    return this.configService.get<number>('dbPort');
  }

  get dbUser(): string {
    return this.configService.get<string>('dbUser');
  }

  get dbPassword(): string {
    return this.configService.get<string>('dbPassword');
  }

  get dbName(): string {
    return this.configService.get<string>('dbName');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('jwtSecret');
  }

  get mongoUrl(): string {
    return this.configService.get<string>('mongoUrl');
  }
}
