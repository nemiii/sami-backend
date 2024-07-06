import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AppConfigService } from '../app-config/app-config.service';
import { NotAuthorizedException } from '../common/exception/not-authorized.exception';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../common/decorators/public-route.decorator';
import { UserService } from '../common/user/service/user.service';
import { GeneralException } from '../common/exception/general.exception';
import { ApiErrorMessages } from '../common/api-errors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private appConfigService: AppConfigService,
    private reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Checking if the route is marked as public to skip the authentication
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new NotAuthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.appConfigService.jwtSecret,
      });

      const user = await this.userService.getUserById(payload.userId);

      if (!user) {
        throw new GeneralException(ApiErrorMessages.InternalIssue);
      }

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = user;
    } catch {
      throw new NotAuthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
