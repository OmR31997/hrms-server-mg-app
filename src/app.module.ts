import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { DbModule } from './database/db/db.module';
import { CompanyModule } from './modules/company/company.module';
import { BranchModule } from './modules/branch/branch.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { PermissionModule } from './modules/permission/permission.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { AssignModule } from './modules/assign_permission/assign.module';
import dbConfig from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig]
    }),
    DbModule,
    CompanyModule,
    BranchModule,
    RoleModule,
    UserModule,
    PermissionModule,
    EmployeeModule,
    AssignModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
