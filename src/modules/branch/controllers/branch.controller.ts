import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BranchService } from '../services/branch.service';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { UpadateBranchDto } from '../dto/update-branch.dto';
import { IBranch } from '../interfaces/branch.interface';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Access, Public } from '@common/decorators';
import { ISuccessResponse } from '@common/interfaces/payload.interface';
import { success } from '@common/utils';

@ApiBearerAuth('access-token')
@Controller('branch')
export class BranchController {
    constructor(private readonly branchService: BranchService) { }

    @Access({ resource: "branch", action: "read" })
    async create_branch(@Body() reqData: CreateBranchDto): Promise<ISuccessResponse<IBranch>> {
        const result = await this.branchService.create(reqData);
        return success("New branch created successfully", result);
    }

    @Get("/read")
    @Access({ resource: "branch", action: "read" })
    async get_branches(): Promise<ISuccessResponse<IBranch[]>> {
        const branches = await this.branchService.readAll();
        return success("Data fetched successfully", branches);
    }

    @Get("/:branchId/read")
    @Access({ resource: "branch", action: "read" })
    async get_branch(@Param("branchId") branchId: string): Promise<ISuccessResponse<IBranch>> {
        const branch = await this.branchService.readSingle({ _id: branchId });
        return success("Data fetched successfully", branch);
    }

    @Patch("/:branchId/update")
    @Access({ resource: "branch", action: "update" })
    async update_branch(@Param("branchId") branchId: string, @Body() reqData: UpadateBranchDto): Promise<ISuccessResponse<IBranch>> {
        const result = await this.branchService.update({_id: branchId}, reqData);
        return success("Branch updated successfully", result);
    }

    @Delete("/:branchId/delete")
    @Access({ resource: "branch", action: "delete" })
    async delete_branch(@Param("branchId") branchId: string): Promise<ISuccessResponse> {
        const result = await this.branchService.delete({ _id: branchId });
        return success("Branch deleted successfully", result);
    }
}
