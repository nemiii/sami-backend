// Dependencies
import { NestFactory, Reflector } from '@nestjs/core';
import { useContainer } from 'class-validator';

// Services
import { AppModule } from './app.module';
import { AppConfigService } from './app-config/app-config.service';
import { RequestValidationPipe } from './common/pipes/request-validation.pipe';
import { ApiRequestInterceptor } from './common/interceptor/api-request.interceptor';

// Exception Handlers
import { GeneralExceptionFilter } from './common/filters/general-exception.filter';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';
import { NotAuthorizedExceptionFilter } from './common/filters/not-authorized-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfigService = app.get(AppConfigService);

  app.enableCors();

  app.useGlobalPipes(new RequestValidationPipe());
  app.useGlobalInterceptors(new ApiRequestInterceptor(app.get(Reflector)));
  app.useGlobalFilters(
    new GeneralExceptionFilter(),
    new ValidationExceptionFilter(),
    new NotAuthorizedExceptionFilter(),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(appConfigService.port);
}
bootstrap();
