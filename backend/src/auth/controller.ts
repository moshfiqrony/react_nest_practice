import {Controller, Post, Req, UseGuards} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { AuthService } from './service';

@Controller()
export class AuthController{
    constructor(private authService: AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Req() req: Request){
        return this.authService.login(req.user);
    }
}