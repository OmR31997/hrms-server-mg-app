import { Module } from '@nestjs/common';
import { jwtConfigFactory } from 'src/config/jwt.config';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { OtpModule } from '../otp/otp.module';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from 'src/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';
import { AdminModule } from '../admin/admin.module';
import { UserModule } from '../user/user.module';

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
