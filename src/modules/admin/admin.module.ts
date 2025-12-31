import { Module } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './admin.schema';
import { RoleModule } from '../role/role.module';
import { AdminController } from './controllers/admin.controller';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Admin.name, schema: AdminSchema}]),
    RoleModule,
    PermissionModule
  ],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService]
})
export class AdminModule {}
