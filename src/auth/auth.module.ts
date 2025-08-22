import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    UsuariosModule,
    JwtModule.register({
      global: true, //tornando o JwtModule global para não precisar importar em outros módulos
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15m' }, //duração do token JWT
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, RolesGuard],
  exports: [AuthService, AuthGuard, RolesGuard]
})
export class AuthModule {}
