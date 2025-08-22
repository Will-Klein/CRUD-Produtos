import { IsEmail, IsString, MinLength } from "class-validator"

export class SignupDTO{
    @IsString()
    nome:string

    @IsEmail()
    email:string

    @IsString()
    @MinLength(3)
    password:string

    @IsString()
    role : string
}