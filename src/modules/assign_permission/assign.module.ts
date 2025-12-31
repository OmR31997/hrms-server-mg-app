import { Module } from '@nestjs/common';
import { AssignService } from './services/assign.service';
import { AssignController } from './controllers/assign.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignPermission, AssignPermissionSchema } from './assign_permission.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: AssignPermission.name, schema: AssignPermissionSchema }])],
    providers: [AssignService],
    controllers: [AssignController],
    exports: [AssignService]
})
export class AssignModule { }
