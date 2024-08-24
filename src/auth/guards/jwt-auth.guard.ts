import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtGuard extends AuthGuard("jwt") {
    constructor(private readonly configService: ConfigService){
        super()
    }


    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if (err || !user) {
            throw err || new Error("Unauthorized access");
        }
        return user;
    }

}


    
