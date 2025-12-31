import { ConfigModule } from "@nestjs/config";
import dbConfig from './config/db.config';
import { DbModule } from './database/db/db.module';
import { jwtConfigFactory } from './config';
import {
  AdminModule, AssignModule, AuthModule, BranchModule, BranchTransferModule, CompanyModule, DocLogModule,
  DocumentModule, EmployeeHistoryModule, EmployeeModule, OtpModule, PermissionModule, RoleModule,
  UserModule, VisaHistoryModule, VisaModule, VisaQuotaLogModule
} from './modules';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig, jwtConfigFactory]
    }),
    DbModule,
    AuthModule,
    CommonModule,

    AdminModule,
    UserModule,

    EmployeeModule,
    EmployeeHistoryModule,

    RoleModule,
    PermissionModule,
    AssignModule,

    VisaModule,
    VisaHistoryModule,
    VisaQuotaLogModule,

    DocumentModule,
    DocLogModule,

    CompanyModule,
    
    BranchModule,
    BranchTransferModule,

    OtpModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
