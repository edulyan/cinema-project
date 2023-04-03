import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    try {
      const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!roles) {
        return true;
      }

      const req = context.switchToHttp().getRequest();

      return roles.some((role) => req.user.role.includes(role));
    } catch (err) {
      console.log(err);
      throw new HttpException(err, HttpStatus.FORBIDDEN, {
        cause: new Error('NOT ENOUGH RIGHTS'),
      });
    }
  }
}
