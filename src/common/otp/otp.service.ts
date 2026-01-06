import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Otp, OtpDocument } from './otp.schema';
import { Model } from 'mongoose';
import { cryptoHash } from '@common/utils';

@Injectable()
export class OtpService {
    private readonly OTP_EXPIRY_MINUTES = 3;

    constructor(
        @InjectModel(Otp.name)
        private readonly otpModel: Model<OtpDocument>
    ) { }

    private async hashOtp(otp: string): Promise<string> {
        return cryptoHash(otp);
    }

    async generateOtp(userId): Promise<string> {
        await this.otpModel.deleteMany({ userId })

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpHash = await this.hashOtp(otp);

        await this.otpModel.create({
            userId,
            otpHash,
            expiresAt: new Date(Date.now() + this.OTP_EXPIRY_MINUTES * 60 * 1000)
        });

        return otp;
    }

    async verifyOtp(userId: string, otp: string): Promise<boolean> {
        const result = await this.otpModel.findOne({ userId, used: false });

        if (!result || result.expiresAt < new Date()) {
            throw new Error(`OTP Invalid or expired`);
        }

        const otpHash = await this.hashOtp(otp);

        if (otpHash !== result.otpHash) return false;
        result.used = true;

        await result.save();

        return true;
    }

}
