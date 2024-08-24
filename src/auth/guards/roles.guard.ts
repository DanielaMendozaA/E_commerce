import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UsersService } from "src/users/users.service";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { RolesService } from "src/roles/roles.service";


@Injectable()
export class RolesGuard implements CanActivate{
    constructor(
        private reflector: Reflector,
        private usersService: UsersService,
        private rolesService: RolesService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
        if(!roles) return true 

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log('User from request:', user); 
        if(!user) 
            throw new UnauthorizedException('User not found', user);

        const roleId = await this.usersService.getRoleByUserId(user.id);
        const { name } = await this.rolesService.findRole(roleId);
        
        if(!name) 
            throw new UnauthorizedException('User not found');

        const hasRole = roles.includes(name);
        if(!hasRole) 
            throw new UnauthorizedException('User does not have the necessary role');
       
        return true
    }

}