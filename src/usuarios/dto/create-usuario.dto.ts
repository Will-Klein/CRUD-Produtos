import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    nome: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(3)
    senha: string;
}
