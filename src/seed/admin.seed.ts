import { Model } from "mongoose";
import { AdminDocument } from "@module/admin/admin.schema";
import { RoleDocument } from "@module/role/role.schema";
import * as bcrypt from "bcrypt";

export class AdminSeeder {
    private readonly SALT = Number(process.env.BCRYPT_SALT) || 10;
    private readonly ADMIN_ROLE = "admin";

    constructor(
        private readonly adminModel: Model<AdminDocument>,
        private readonly roleModel: Model<RoleDocument>
    ) { }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.SALT)
    }

    private async getOrCreateAdminRole(): Promise<RoleDocument>{
        let role = await this.roleModel.findOne({ name: "admin" });

        if (!role) {
            role = await this.roleModel.create({
                name: this.ADMIN_ROLE,
                description: 'System Administrator',
                is_system: true
            });

            console.log('--Admin role created--');
        }

        return role;
    }
    
    async run(): Promise<void> {
        const adminData = {
            name: process.env.ADMIN_NAME ?? "Admin",
            email: process.env.ADMIN_MAIL ?? "admin@support.com",
        }

        const PASSWORD = process.env.ADMIN_PASSWORD ?? "admin";

        // Step 1: Is exist email
        const adminExist = await this.adminModel.findOne({ email: adminData.email })

        if (adminExist) {
            console.log("--Admin already exists--");
            return;
        }

        // Step 2: Ensure role exists
        const role = await this.getOrCreateAdminRole();

        // Step 3: Hashed passwrod
        const hashedPassword = await this.hashPassword(PASSWORD);

        // Step 4: Create admin
        await this.adminModel.create({
            ...adminData,
            password: hashedPassword,
            role_id: role._id
        });

        console.log('--Admin created successfully--');
    }
}