import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfigModule } from '../../app-config/app-config.module';
import { AppConfigService } from '../../app-config/app-config.service';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (
        appConfigService: AppConfigService,
      ): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: appConfigService.dbUrl,
        port: appConfigService.dbPort,
        username: appConfigService.dbUser,
        password: appConfigService.dbPassword,
        database: appConfigService.dbName,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: false,
        // https://orkhan.gitbook.io/typeorm/docs/logging
        logging: appConfigService.snEnv !== 'dev',
        // log slow queries
        maxQueryExecutionTime: 2500,
        namingStrategy: new SnakeNamingStrategy(),
        ssl: true,
      }),
      inject: [AppConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseConfigModule {}
