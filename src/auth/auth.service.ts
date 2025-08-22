import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        private readonly usuariosService: UsuariosService,
        private readonly jwtService: JwtService,
    ) {} //readonly = proteção contra reatribuição.

    async signIn(email: string, password: string): Promise<{acess_token: string}> {
        const user = await this.usuariosService.findByEmailAuth(email);
        if (user?.senha !== password) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = { sub: user.id, email: user.email, role: user.role.nome }; //sub se refere ao id do usuário e o payload n é criptografado, ent n coloque dados sensíveis, pois ele é apenas o corpo da mensagem do token JWT.

        //para puxar o role.nome, foi graças ao findByEmailAuth
        return {
            acess_token: await this.jwtService.sign(payload),
        };
    }
}
