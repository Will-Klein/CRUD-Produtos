import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { SignupDTO } from 'src/auth/dto/signup.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Roles('ADMIN')
  @Post('create/admin')
  create(@Body() dto: SignupDTO, ) {   
    return this.usuariosService.createAdmin(dto);
  }

  @Roles('ADMIN')
  @Get('find/admin')
  findAll() {
    return this.usuariosService.findAll();
  }

  @Roles('ADMIN')
  @Get('find/admin/:id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Roles('ADMIN')
  @Get('find/email')
  findByEmail(@Body() email: string) {
    return this.usuariosService.findByEmail(email);
  }

  @Get('find/me')
  findMe(@Request() req) {
    const id = req.user.sub;
    return this.usuariosService.findMe(id);
  }

  @Patch('update/me')
  updateMe(@Body() updateUsuarioDto: UpdateUsuarioDto, @Request() req) {
    const id = Number(req.user.sub);
    return this.usuariosService.updateMe(updateUsuarioDto, id);
  }

  @Roles('ADMIN')
  @Patch('update/admin/:id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Roles('ADMIN')
  @Delete('delete/admin/:id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }

  @Delete('delete/me/:id')
  removeMe(@Request() req) {
    const id = Number(req.user.sub);
    return this.usuariosService.removeMe(id);
  }
}
