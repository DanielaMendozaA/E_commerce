import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from 'src/common/errors';
import { CustomUnauthorizedException } from 'src/common/exceptions/custom-unauthorized.exception';


@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService, // Inyecta LoggerService
  ) {
    super();
  }

  handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
    const request = context.switchToHttp().getRequest();
    const clientIp = request.ip || request.connection.remoteAddress;

    if (err || !user) {
      const errorMessage = 'You are not authorized to access this resource';
      this.logger.error(JSON.stringify({ message: errorMessage, clientIp })); // Registra el error con la IP del cliente
      throw new CustomUnauthorizedException(errorMessage); // Lanza la excepción personalizada
    }
    this.logger.log(`User authenticated successfully from IP: ${clientIp}`); // Registra el éxito con la IP del cliente
    return user;
  }
}