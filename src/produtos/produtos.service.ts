import { Injectable, UseGuards } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProdutoDto, userId: number) {
    return await this.prisma.produtos.create({
      data: {
        nome: dto.nome,
        preco: dto.preco,
        usuario_id: userId
      }
    });
  }

  async findAllAdmin() {
    return await this.prisma.produtos.findMany();
  }

  async findAll(userID: number) {
    return await this.prisma.produtos.findMany({ where: {usuario_id: userID}});
  }

  async findOneAdmin(id: number) {
    return await this.prisma.produtos.findUnique({where: {id:id}});
  }

  async findOne(id: number, userID: number) {
      return await this.prisma.produtos.findFirst({ where: { id: id, usuario_id: userID } }); //findfirst para por 2 parametros no where
  }

  async updateAdmin(id: number, dto: UpdateProdutoDto) {
    return await this.prisma.produtos.update({
      where: { id },
      data: {
        nome: dto.nome ?? undefined,
        preco: dto.preco ?? undefined,
      }
    });
  }

  async update(id: number, dto: UpdateProdutoDto, userID: number) {
      return await this.prisma.produtos.update({
        where: { id: id, usuario_id: userID },
        data: {
          nome: dto.nome ?? undefined,
          preco: dto.preco ?? undefined,
        }
      });
    }

  async removeAdmin(id: number) {
    return await this.prisma.produtos.delete({ where: { id: id } });
  }

  async remove(id: number, userID: number) {
      return await this.prisma.produtos.delete({ where: { id: id, usuario_id: userID } });
  }
}
