import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';


@UseGuards(AuthGuard, RolesGuard)
@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  create(@Body() dto: CreateProdutoDto, @Request() req) { //meu guard deixou o payload no request, ou seja, acessa com req.user
    const userID = Number(req.user.sub);
    return this.produtosService.create(dto, userID);
  }

  @Roles('ADMIN')
  @Get('find/admin')
  findAllAdmin(@Request() req) {
    return this.produtosService.findAllAdmin();
  }

  @Get('find')
  findAll(@Request() req) {
    const userID = Number(req.user.sub);
    return this.produtosService.findAll(userID);
  }

  @Roles('ADMIN')
  @Get('find/admin/:id')
  findOneAdmin(@Param('id') id: string, @Request() req) {
    return this.produtosService.findOneAdmin(+id);
  }

  @Get('find/one/:id')
  findOne(@Param('id') id: string, @Request() req) {
    const userID = Number(req.user.sub);
    return this.produtosService.findOne(+id, userID);
  }

  @Roles('ADMIN')
  @Patch('update/admin/:id')
  updateAdmin(@Param('id') id: string, @Body() dto: UpdateProdutoDto, @Request() req) {
    return this.produtosService.updateAdmin(+id, dto);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateProdutoDto, @Request() req) {
    const userID = Number(req.user.sub);
    return this.produtosService.update(+id, dto, userID);
  }

  @Roles('ADMIN')
  @Delete('delete/admin/:id')
  removeAdmin(@Param('id') id: string, @Request() req) {
    return this.produtosService.removeAdmin(+id);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string, @Request() req) {
    const userID = Number(req.user.sub);
    return this.produtosService.remove(+id, userID);
  }
}
