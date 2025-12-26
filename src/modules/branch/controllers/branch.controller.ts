import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BranchService } from '../services/branch.service';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { SuccessResponse } from 'src/utils/respons.interface';
import { UpadateBranchDto } from '../dto/update-branch.dto';

@Controller('branch')
export class BranchController {
    constructor(private readonly branchService: BranchService) { }

    @Post("/create")
    async create_branch(@Body() reqData: CreateBranchDto): Promise<SuccessResponse> {
        return this.branchService.create(reqData);
    }

    @Get("/read")
    async get_branches(): Promise<SuccessResponse> {
        return this.branchService.readAll();
    }

    @Get("/:branchId/read")
    async get_branch(@Param("branchId") branchId: string): Promise<SuccessResponse> {
        return this.branchService.readById({ _id: branchId });
    }

    @Patch("/:branchId/update")
    async update_branch(@Param("branchId") branchId: string, @Body() reqData: UpadateBranchDto): Promise<SuccessResponse> {
        const keyVal = {
            _id: branchId
        }

        return this.branchService.update(keyVal, reqData);
    }

    @Delete("/:branchId/delete")
    async delete_branch(@Param("branchId") branchId: string) {
        return this.branchService.delete({ _id: branchId });
    }
}
