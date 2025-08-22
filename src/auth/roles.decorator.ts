import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles); // cria um decorator chamado roles que pode ser usado com um conjunto de string (nomes de roles) e usa o SetMetadata para armazenar esses valores no contexto do request.