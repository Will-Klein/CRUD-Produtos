import { Injectable } from '@nestjs/common';
import { SignupDTO } from 'src/auth/dto/signup.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}
  
  async createAdmin(dto: SignupDTO) {
    return await this.prisma.usuarios.create({
      data: {
        nome: dto.nome,
        email: dto.email,
        senha: dto.password,
        role: { connect: { nome: dto.role } } //CONECTA a um registro já existente com o nome especificado.
      },
      select: {
        id: true,
        nome: true,
        email: true,
      }
    });
  }

  async findAll() {
    return await this.prisma.usuarios.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.usuarios.findUnique({
      where : { id: id }, 
      select: {
        id: true, 
        nome: true,
        email: true
      } 
    });
  }

  async findMe(id: number) {
    return await this.prisma.usuarios.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true
      }
    })
  }

  update(id: number, dto: UpdateUsuarioDto) {
    return this.prisma.usuarios.update({
      where: { id: id },
      data: {
        nome: dto.nome,
        email: dto.email,
        senha: dto.senha,
      },
      select: {
        id: true,
        nome: true,
        email: true,
      }
    });
  }

  async updateMe(dto: UpdateUsuarioDto, id: number){
    return await this.prisma.usuarios.update({
      where: {id},
      data: {
        nome: dto.nome,
        email: dto.email,
        senha: dto.senha,
      },
      select: {
        id: true,
        nome: true,
        email: true,
      }
    })
  }

  async remove(id: number) {
    return await this.prisma.usuarios.delete({ where: { id: id } });
  }

  async removeMe(id: number) {
    return await this.prisma.usuarios.delete({where: {id}});
  }

  async findByEmailAuth(email: string) {
    return await this.prisma.usuarios.findUnique({
      where: {email: email},
      include: { role: {  //inclui os dados da tabela rol
        select: { nome: true} //seleciona apenas o nome da role
      }},
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.usuarios.findUnique({
      where: {email : email},
      select: {
        id: true,
        nome: true,
        email: true,
      }
    });
  }
  
}
