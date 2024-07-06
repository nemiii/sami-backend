import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppConfigModule } from '../../app-config/app-config.module';
import { AppConfigService } from '../../app-config/app-config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (
        appConfigService: AppConfigService,
      ): MongooseModuleOptions => ({
        uri: appConfigService.mongoUrl,
      }),
      inject: [AppConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class MongodbConfigModule {}
