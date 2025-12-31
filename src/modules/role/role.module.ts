import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './role.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Role.name, schema: RoleSchema}])],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService]
})
export class RoleModule {}
