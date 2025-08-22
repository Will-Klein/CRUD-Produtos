import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUsuarioDto {
    @IsOptional()
    @IsString()
    nome?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    senha?: string;
}

