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
import { BankAccountModule } from './modules/bank-account/bank-account.module';
import { BankAccountHistoryModule } from './modules/bank-account-history/bank-account-history.module';
import { SalaryAdvanceModule } from './modules/salary-advance/salary-advance.module';
import { SalaryLotModule } from './modules/salary-lot/salary-lot.module';
import { SalaryModule } from './modules/salary/salary.module';
import { SalaryHistoryModule } from './modules/salary-history/salary-history.module';
import { SalaryLockModule } from './modules/salary-lock/salary-lock.module';
import { SalaryPaymentModule } from './modules/salary-payment/salary-payment.module';
import { NotificationModule } from './modules/notification/notification.module';
import { AuditLogModule } from './modules/audit-log/audit-log.module';
import { SystemJobModule } from './modules/system-job/system-job.module';
import { AdvanceDeductionModule } from "@module/advance-deduction/advance-deduction.module";
import { AdvanceHistoryModule } from "@module/advance-history/advance-history.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
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

    BankAccountModule,

    BankAccountHistoryModule,

    SalaryAdvanceModule,

    AdvanceDeductionModule,

    AdvanceHistoryModule,

    SalaryLotModule,

    SalaryModule,

    SalaryHistoryModule,

    SalaryLockModule,

    SalaryPaymentModule,

    NotificationModule,

    AuditLogModule,

    SystemJobModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
