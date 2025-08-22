import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, AuthGuard],
  exports: [UsuariosService], //tornando visível para outros módulos (auth)
})
export class UsuariosModule {}
