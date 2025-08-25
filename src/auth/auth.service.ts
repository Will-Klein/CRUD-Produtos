import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDTO } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (
        private readonly usuariosService: UsuariosService,
        private readonly jwtService: JwtService,
    ) {} //readonly = proteção contra reatribuição.

    async signIn(email: string, password: string): Promise<{acess_token: string}> {
        const user = await this.usuariosService.findByEmailAuth(email);
        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const testPassword = await bcrypt.compare(password, user.senha);
        if (!testPassword){
            throw new UnauthorizedException("Credenciais inválidas")
        }

        const payload = { sub: user.id, email: user.email, role: user.role.nome }; //sub se refere ao id do usuário e o payload n é criptografado, ent n coloque dados sensíveis, pois ele é apenas o corpo da mensagem do token JWT.

        //para puxar o role.nome, foi graças ao findByEmailAuth
        return {
            acess_token: await this.jwtService.sign(payload),
        };
    }

    async signUp(dto : SignupDTO) {
        const userAlreadyExists = await this.usuariosService.findByEmailAuth(dto.email);

        if (userAlreadyExists){
            throw new UnauthorizedException('E-mail já cadastrado');
        }

        dto.password = await bcrypt.hash(dto.password, 10);

        const user = await this.usuariosService.createAdmin(dto);

        return user
    }
}
