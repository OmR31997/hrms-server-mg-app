import { Module } from '@nestjs/common';
import { PermissionService } from './services/permission.service';
import { PermissionController } from './controllers/permission.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, PermissionSchema } from './permission.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }])],
  providers: [PermissionService],
  controllers: [PermissionController],
  exports: [PermissionService]
})
export class PermissionModule { }
