import { ConfigModule } from "@nestjs/config";
import dbConfig from '@config/db.config';
import { DbModule } from '@database/db/db.module';
import { jwtConfigFactory } from '@config/jwt.config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { CommonModule } from '@common/common.module';

import { AuthModule } from "@module/auth/auth.module";
import { AdminModule } from "@module/admin/admin.module";
import { UserModule } from "@module/user/user.module";
import { EmployeeModule } from "@module/employee/employee.module";
import { EmployeeHistoryModule } from "@module/employee-history/employee-history.module";
import { RoleModule } from "@module/role/role.module";
import { PermissionModule } from "@module/permission/permission.module";
import { AssignModule } from "@module/assign_permission/assign.module";
import { VisaModule } from "@module/visa/visa.module";
import { VisaHistoryModule } from "@module/visa-history/visa-history.module";
import { VisaQuotaLogModule } from "@module/visa-quota-log/visa-quota-log.module";
import { DocumentModule } from "@module/document/document.module";
import { DocLogModule } from "@module/doc-log/doc-log.module";
import { CompanyModule } from "@module/company/company.module";
import { BranchModule } from "@module/branch/branch.module";
import { BranchTransferModule } from "@module/branch-transfer/branch-transfer.module";
import { OtpModule } from "@module/otp/otp.module";

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
