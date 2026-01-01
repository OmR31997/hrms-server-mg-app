import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { LoginDto } from '../dto/login.dto';
import { AdminService } from '@module/admin/services/admin.service';
import { UserService } from '@module/user/services/user.service';
import { IToken, IValidatedUser } from '../interfaces/auth.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RefreshToken, RefreshTokenDocument } from '@common/schemas/refresh-tokens.schema';
import { addDays, cryptoHash, generateRefreshToken } from '@common/utils/crypto.util';
import { JwtRequestPayload } from '@common/types/payload.type';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(RefreshToken.name)
        private refreshModel: Model<RefreshTokenDocument>,
        private readonly adminService: AdminService,
        private readonly userService: UserService,
        private jwtService: JwtService
    ) { }

    private async signToken(payload: JwtRequestPayload, options?: JwtSignOptions): Promise<IToken> {
        const access_token = this.jwtService.sign(payload, options);
        const refresh_token = generateRefreshToken();


        await this.refreshModel.create({
            owner_id: new Types.ObjectId(payload.sub),
            ref_by: payload.ref_by,
            role_id: new Types.ObjectId(payload.role_id),
            company_id: payload.company_id ? new Types.ObjectId(payload.company_id) : undefined,
            token_hash: cryptoHash(refresh_token),
            expires_at: addDays(7)
        });

        return { access_token, refresh_token };
    }

    private async validatedUser(reqData: LoginDto): Promise<IValidatedUser> {
        const { email, password, otp } = reqData;

        if (email.split("@")[0].endsWith("admin") && password) {

            const admin = await this.adminService.readSingle({ email }, "+password role_id");

            if (!admin) {
                throw new NotFoundException(`User not found for email: '${email}'`);
            }

            const passwordMatches = await bcrypt.compare(password, admin.password);

            if (!passwordMatches) {
                throw new UnauthorizedException("Invalid credentials");
            }

            return { _id: admin._id, role_id: admin.role_id, ref_by: "Admin" };

        } else {

            if (otp) {
                //OTP Logic
            }

            const user = await this.userService.readSingle({ email }, "role_id");

            if (!user) {
                throw new NotFoundException(`User not found for email: '${email}'`);
            }

            return { _id: user._id, role_id: user.role_id, ref_by: "User" };
        }
    }

    async login(reqData: LoginDto): Promise<IToken> {
        const validated = await this.validatedUser({
            email: reqData.email,
            password: reqData.password,
            otp: reqData.otp
        });

        const payload = {
            sub: validated._id!.toString(),
            ref_by: validated.ref_by as "Admin" | "User",
            role_id: validated.role_id!.toString(),
            company_id: validated.company_id?.toString(),
        };

        const tokens = await this.signToken(payload);

        return tokens;
    }

    async refreshAccessToken(refreshToken: string): Promise<IToken> {
        const hashedToken = cryptoHash(refreshToken);

        const tokenDoc = await this.refreshModel.findOne({
            token_hash: hashedToken,
            revoked_at: null,
            expires_at: { $gt: new Date() }
        });

        if (!tokenDoc) {
            throw new UnauthorizedException("Invalid refresh token");
        }

        const payload: JwtRequestPayload = {
            sub: tokenDoc.owner_id.toString(),
            ref_by: tokenDoc.ref_by as "Admin" | "User",
            role_id: tokenDoc.role_id.toString(),
            company_id: tokenDoc.company_id ? tokenDoc.company_id.toString() : null
        }

        const access_token = this.jwtService.sign(payload);

        return { access_token };
    }

    async logout(refreshToken: string) {
        const hashedToken = cryptoHash(refreshToken);

        await this.refreshModel.updateOne(
            { token_hash: hashedToken },
            { revoked_at: new Date() }
        );
    }

    async logoutAllFromAllDevices(ownerId: string, ref_by: "User" | "Admin") {
        await this.refreshModel.updateMany({ owner_id:ownerId, ref_by }, {revoked_at: new Date()})
    }
}
