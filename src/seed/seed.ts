import { NestFactory } from "@nestjs/core"
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppModule } from "app.module"
import { Admin, AdminDocument } from "@module/admin/admin.schema";
import { Role, RoleDocument } from "@module/role/role.schema";
import { AdminSeeder } from "./admin.seed";

const bootstrap = async (): Promise<void> =>{
    const appContext = await NestFactory.createApplicationContext(AppModule);

    const roleModel = appContext.get<Model<RoleDocument>>(getModelToken(Role.name));
    const adminModel = appContext.get<Model<AdminDocument>>(getModelToken(Admin.name));

    const seeder = new AdminSeeder(roleModel, adminModel);
    await seeder.run();
    await appContext.close();
}

bootstrap().catch((error)=>{
    console.error(' Seeding failed:', error);
    process.exit(1);
})