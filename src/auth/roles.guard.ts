import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate { //implementa uma interface de guards, que executa antes do controller para decidir se a requisição pode continuar.
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean { // essa interface exige esse único método, o qual retorna true se pode passar para o controller ou uma exception se não puder
        const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [context.getHandler(), context.getClass()]); //pega as roles requeridas do decorator @Roles, que foi definido no controller. O getAllAndOverride pega o valor mais específico, ou seja, se houver um decorator em um método, ele pega esse valor, se não, pega o valor da classe

        if (!requiredRoles || requiredRoles.length === 0) {
            return true; //se não há roles requeridas, permite o acesso
        }

        //pega o payload que o AuthGuard colocou em req.user
        const req = context.switchToHttp().getRequest();
        const userRole = req.user.role;

        if (requiredRoles.includes(userRole)) {
            return true; //se a role do usuário está entre as roles requeridas, permite o acesso
        }

        //se não...
        throw new ForbiddenException('Acesso negado.');
    }
}