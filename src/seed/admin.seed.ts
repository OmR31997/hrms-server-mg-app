import { Model, Types } from "mongoose";
import { AdminDocument } from "@module/admin/admin.schema";
import { RoleDocument } from "@module/role/role.schema";
import * as bcrypt from "bcrypt";

export class AdminSeeder {
    private readonly SALT = Number(process.env.BCRYPT_SALT) || 10;
    private readonly ADMIN_ROLE = "admin";

    constructor(
        private readonly roleModel: Model<RoleDocument>,
        private readonly adminModel: Model<AdminDocument>,
    ) {}

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.SALT);
    }

    // Seeding role for admin without validators
    private async getOrCreateAdminRole(): Promise<RoleDocument> {
        try {
            await this.roleModel.collection.insertOne({
                name: this.ADMIN_ROLE,
                description: "System Administrator",
                is_system: true,
            });

            console.log("--Admin role created--");
        } catch (err: any) {
            // Ignore duplicate key error
            if (err.code !== 11000) throw err;
        }

        return (await this.roleModel.findOne({
            name: this.ADMIN_ROLE,
        })) as RoleDocument;
    }

    // Admin seeding
    async run(): Promise<void> {
        const adminData = {
            name: process.env.ADMIN_NAME ?? "Admin",
            email: process.env.ADMIN_MAIL ?? "admin@support.com",
        };

        const password = process.env.ADMIN_PASSWORD ?? "admin";
        const hashedPassword = await this.hashPassword(password);
        const role = await this.getOrCreateAdminRole();

        try {
            await this.adminModel.collection.insertOne({
                ...adminData,
                password: hashedPassword,
                role_id: new Types.ObjectId(role._id),
            });

            console.log("--Admin created successfully--");
        } catch (err: any) {
            if (err.code === 11000) {
                console.log("--Admin already exists--");
                return;
            }
            throw err;
        }
    }
}
