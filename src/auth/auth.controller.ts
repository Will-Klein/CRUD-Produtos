import { 
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {} //readonly = proteção contra reatribuição.

    @Post('login')
    @HttpCode(HttpStatus.OK) //responde 200, caso de tudo certo
    signIn(@Body() dto: LoginDto) {
        return this.authService.signIn(dto.email, dto.password);
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
