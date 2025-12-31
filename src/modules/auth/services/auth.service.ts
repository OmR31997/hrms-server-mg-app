import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { LoginDto } from '../dto/login.dto';
import { AdminService } from 'src/modules/admin/services/admin.service';
import { UserService } from 'src/modules/user/services/user.service';
import { ILogin, IValidatedUser } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly adminService: AdminService,
        private readonly userService: UserService,
        private jwtService: JwtService
    ) { }

    private async generateJwt(payload: any, options?: JwtSignOptions): Promise<string> {
        return this.jwtService.sign(payload, options);
    }

    async validatedUser(reqData: LoginDto): Promise<IValidatedUser> {
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

            return admin;

        } else {

            if (otp) {
                //OTP Logic
            }

            const user = await this.userService.readSingle({ email }, "role_id");

            if (!user) {
                throw new NotFoundException(`User not found for email: '${email}'`);
            }

            return user
        }
    }

    async login(reqData: LoginDto): Promise<ILogin> {
        const validated = await this.validatedUser({
            email: reqData.email,
            password: reqData.password,
            otp: reqData.otp
        });

        const payload = {
            sub: validated._id!.toString(),
            role_id: validated.role_id!.toString(),
        };

        const token = await this.generateJwt(payload);

        return { access_token: token };
    }
}
