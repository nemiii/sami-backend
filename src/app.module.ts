import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './common/user/user.module';
import { DatabaseConfigModule } from './common/database-config/database-config.module';
import { AuthModule } from './auth/auth.module';
import { MongodbConfigModule } from './common/mongodb-config/mongodb-config.module';
import { RequestContextModule } from 'nestjs-request-context';

@Module({
  imports: [
    UserModule,
    DatabaseConfigModule,
    AuthModule,
    MongodbConfigModule,
    RequestContextModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
