import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtAuthGuard } from "./guards";
import { APP_GUARD } from "@nestjs/core";
import {
  AssignPermission, AssignPermissionSchema,
  Permission, PermissionSchema,
  Role, RoleSchema
} from "../modules"

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: AssignPermission.name, schema: AssignPermissionSchema },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class CommonModule { }
