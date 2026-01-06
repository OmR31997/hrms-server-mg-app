import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ACCESS_KEY } from "@common/decorators/access.decorator";
import { Role, RoleDocument } from "@module/role/role.schema"
import { Permission, PermissionDocument } from "@module/permission/permission.schema"
import { AssignPermission, AssignPermissionDocument } from "@module/assign_permission/assign_permission.schema"

@Injectable()
export class AccessGuard implements CanActivate {
    constructor(
        private reflector: Reflector,

        @InjectModel(Role.name)
        private roleModel: Model<RoleDocument>,

        @InjectModel(Permission.name)
        private permissionModel: Model<PermissionDocument>,

        @InjectModel(AssignPermission.name)
        private assignModel: Model<AssignPermissionDocument>
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log("Controller hit");
        const req = context.switchToHttp().getRequest();

        const user = req.user;

        // Step 1: Get requred access from decorator
        const access = this.reflector.get(ACCESS_KEY, context.getHandler());

        if (!access) return true;

        const { action, resource } = access;

        // Step 2: Fetch Role
        const role = await this.roleModel.findById(user.role_id).select("_id name");
        if (!role) return false;

        // Step 3: Admin Role
        if (role.name === "admin") {
            return true;
        }

        // Step 4: Check permission
        const permission = await this.permissionModel.findOne({ action, resource });

        if (!permission) return false;

        // Step 5: Check role-permission mapping
        const exist = await this.assignModel.exists({ role_id: role._id, permission_id: permission._id });

        return !!exist;

    }
}