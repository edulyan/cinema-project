import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      console.log(req);
      const token: string = req.cookies.access_token.access_token;

      if (!token) {
        throw new HttpException(
          'The user is not Authorized',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (err) {
      throw new HttpException(err, HttpStatus.UNAUTHORIZED, {
        cause: new Error('The user is not Authorized'),
      });
    }
  }
}
