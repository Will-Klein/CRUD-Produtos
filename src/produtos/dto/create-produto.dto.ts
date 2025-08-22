import { IsString, IsOptional, IsInt, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProdutoDto {
  @IsString() nome: string;

  @IsDecimal({ force_decimal: true, decimal_digits: '0,2' })
  preco: string; 
}