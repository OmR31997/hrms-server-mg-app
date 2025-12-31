import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BranchService } from '../services/branch.service';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { success, SuccessResponse } from 'src/utils/response.interface';
import { UpadateBranchDto } from '../dto/update-branch.dto';
import { JwtAuthGuard } from 'src/common';
import { Access } from 'src/common/decorators/access.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { IBranch } from '../interfaces/branch.interface';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('branch')
@UseGuards(JwtAuthGuard)
export class BranchController {
    constructor(private readonly branchService: BranchService) { }

    @Access({action: "read", resource:"branch"})
    async create_branch(@Body() reqData: CreateBranchDto): Promise<SuccessResponse<IBranch>> {
        const result = await this.branchService.create(reqData);
        return success("New branch created successfully", result);
    }

    @Public()
    @Get("/read")
    async get_branches(): Promise<SuccessResponse<IBranch[]>> {
        const branches = await this.branchService.readAll();
        return success("Data fetched successfully", branches);
    }

    @Access({action: "read", resource:"branch"})
    @Get("/:branchId/read")
    async get_branch(@Param("branchId") branchId: string): Promise<SuccessResponse<IBranch>> {
        const branch = await this.branchService.readSingle({ _id: branchId });
        return success("Data fetched successfully", branch);
    }

    @Patch("/:branchId/update")
    async update_branch(@Param("branchId") branchId: string, @Body() reqData: UpadateBranchDto): Promise<SuccessResponse<IBranch>> {
        const result = await this.branchService.update({_id: branchId}, reqData);
        return success("Branch updated successfully", result);
    }

    @Delete("/:branchId/delete")
    async delete_branch(@Param("branchId") branchId: string): Promise<SuccessResponse> {
        const result = await this.branchService.delete({ _id: branchId });
        return success("Branch deleted successfully", result);
    }
}
