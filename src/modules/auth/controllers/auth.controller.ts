import { Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { Public } from '@common/decorators';
import type { Request, Response } from 'express';
import type { JwtRequestPayload  } from "@common/types/payload.type"
import { ISuccessResponse } from '@common/interfaces/payload.interface';
import { success } from '@common/utils';
import { IToken } from '../interfaces/auth.interface';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post("/login")
    @Public()
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

        return { access_token,  refresh_token};
    }

    @Get("/refresh")
    async get_access_token(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const refreshToken = req.cookies["refreshToken"];

        if (!refreshToken) throw new UnauthorizedException('No refresh token');

        const access_token = await this.authService.refreshAccessToken(refreshToken);

        return access_token;
    }

    @Post("/logout")
    async logout(@Req() req: Request, @Res() res: Response): Promise<ISuccessResponse> {
        const refreshToken = req.cookies["refreshToken"];
        if (!refreshToken) {
            throw new UnauthorizedException('No refresh token');
        }

        await this.authService.logout(refreshToken);
        res.clearCookie("refreshToken", { path: "/auth/refresh" });

        return success("Logout successfully done");
    }

    @Post("/logout-all")
    async logout_all(@Req() user: JwtRequestPayload, @Res() res: Response): Promise<ISuccessResponse> {
        const { sub: owner_id, ref_by} = user;
        await this.authService.logoutAllFromAllDevices(owner_id, ref_by)
        res.clearCookie("refreshToken", { path: "/auth/refresh" });

        return success("Logout successfully done");
    }

}
