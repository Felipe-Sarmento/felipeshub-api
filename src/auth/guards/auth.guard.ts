import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenService } from 'src/shared/jwt/token.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const headersCompleteToken = request.headers.authorization;

    if (!headersCompleteToken) {
      throw new UnauthorizedException('Token not found');
    }

    const headersToken = request.headers.authorization.split(' ')[1];

    return new Promise((resolve, reject) => {
      this.tokenService.validate(headersToken)
        .then((isTokenValid) => {
          if (!isTokenValid) {
            reject(new UnauthorizedException('Invalid Token'));
          } else {
            resolve(true);
          }
        })
        .catch((error) => {
          reject(new UnauthorizedException('Error on token service'));
        });
    });
  }
}
