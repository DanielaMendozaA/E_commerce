import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UsersService } from "src/users/users.service";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { RolesService } from "src/roles/roles.service";
import { CustomUnauthorizedException } from "src/common/exceptions/custom-unauthorized.exception";
import { LoggerService } from "src/common/services/logger.service";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private usersService: UsersService,
        private rolesService: RolesService,
        private logger: LoggerService // Inyecta LoggerService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
        if (!roles) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        this.logger.log(`User from request: ${JSON.stringify(user)}`); // Usa Logger para registrar el mensaje
        if (!user) {
            this.logger.error('User not found');
            throw new CustomUnauthorizedException('User not found');
        }

        const roleId = await this.usersService.getRoleByUserId(user.id);
        const { name } = await this.rolesService.findRole(roleId);

        if (!name) {
            this.logger.error('Role not found for user');
            throw new CustomUnauthorizedException('User not found');
        }

        const hasRole = roles.includes(name);
        if (!hasRole) {
            this.logger.error('User does not have the necessary role');
            throw new CustomUnauthorizedException('User does not have the necessary role');
        }

        this.logger.log('User has the necessary role');
        return true;
    }
}