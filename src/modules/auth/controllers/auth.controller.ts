import { Body, Controller, Get, Param, Post, Req, Res, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { Public } from '@common/decorators';
import type { Request, Response } from 'express';
import type { JwtRequestPayload } from "@common/types/payload.type";
import { IToken, LoginInterceptor } from '@common/interceptors/login.interceptor';
import { SuccessInterceptor } from '@common/interceptors/success.interceptor';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post("/login")
    @Public()
    @UseInterceptors(LoginInterceptor)
    async login(
        @Body() reqData: LoginDto,
        @Res({ passthrough: true }) res: Response
    ): Promise<IToken> {
        const { refresh_token, access_token } = await this.authService.login(reqData);

        res.cookie("refreshToken", refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/auth/refresh",
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        return { access_token, refresh_token };
    }

    @Post("/:email/otp")
    @Public()
    @UseInterceptors(SuccessInterceptor)
    async sendOtp(@Param("email") email: string): Promise<{ message: string }> {
        const otp = await this.authService.sendOtp(email);
        console.log(`OTP: ${otp}`);
        return { message: "OTP sent successfully" }
    }

    @Get("/refresh")
    async get_access_token(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<IToken> {
        const refreshToken = req.cookies["refreshToken"];

        if (!refreshToken) throw new UnauthorizedException('No refresh token');

        const access_token = await this.authService.refreshAccessToken(refreshToken);

        return access_token;
    }

    @Post("/logout")
    async logout(@Req() req: Request, @Res() res: Response): Promise<{ message: string }> {
        const refreshToken = req.cookies["refreshToken"];
        if (!refreshToken) {
            throw new UnauthorizedException('No refresh token');
        }

        await this.authService.logout(refreshToken);
        res.clearCookie("refreshToken", { path: "/auth/refresh" });

        return { message: "Logout successfully done" }
    }

    @Post("/logout-all")
    async logout_all(@Req() user: JwtRequestPayload, @Res() res: Response): Promise<{ message: string }> {
        const { sub: owner_id, ref_by } = user;
        await this.authService.logoutAllFromAllDevices(owner_id, ref_by)
        res.clearCookie("refreshToken", { path: "/auth/refresh" });

        return { message: "Logout successfully done" };
    }

}
