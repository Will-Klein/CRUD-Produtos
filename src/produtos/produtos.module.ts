import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [ProdutosController],
  providers: [ProdutosService, AuthGuard],
})
export class ProdutosModule {}
