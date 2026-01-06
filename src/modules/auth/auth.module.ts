import { Module } from '@nestjs/common';
import { jwtConfigFactory } from "@config/jwt.config";
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from '@common/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';
import { AdminModule } from '../admin/admin.module';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from "@common/schemas/refresh-tokens.schema";
import { OtpModule } from '@common/otp/otp.module';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: "jwt"}),
    JwtModule.registerAsync({
      inject: [jwtConfigFactory.KEY],
      useFactory: (config: ConfigType<typeof jwtConfigFactory>) => ({
        secret: config.secret,
        signOptions: config.signOptions
      }),
    }),
    MongooseModule.forFeature([{name: RefreshToken.name, schema: RefreshTokenSchema}]),
    AdminModule,
    UserModule,
    OtpModule,
  ],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [
    PassportModule, JwtModule
  ]
})
export class AuthModule { }
