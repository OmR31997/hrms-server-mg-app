import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BranchTransferService } from '../services/branch-transfer.service';
import { success, SuccessResponse } from 'src/utils/response.interface';
import { CreateBranchTransferDto } from '../dto/create-branch-transfer.dto';
import { Access } from 'src/common/decorators/access.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IBranchTransfer } from '../interfaces/branch-transfer.interface';
import { KeyValDto } from '../dto/key-val.dto';
import { UpdateBranchTransferDto } from '../dto/update-branch-transfer.dto';

@ApiBearerAuth('access-token')
@Controller('branch-transfer')
export class BranchTransferController {
    constructor(private readonly branchTransferService: BranchTransferService) { }

    @Post("/create")
    @Access({ action: "create", resource: "branch-transfer" })
    async branch_trasfer_request(@Body() reqData: CreateBranchTransferDto): Promise<SuccessResponse<IBranchTransfer>> {

        const result = await this.branchTransferService.create(reqData);
        return success("Branch transfer requested successfully", result);
    }

    @Get("/read")
    @Access({ action: "read", resource: "branch-transfer" })
    async get_branch_transfer_requests(): Promise<SuccessResponse<IBranchTransfer[]>> {

        const result = await this.branchTransferService.readAll();
        return success("Data fetched successfully", result);
    }

    @Get("/:reqId/read")
    @Access({ action: "read", resource: "branch-transfer" })
    async get_branch_transfer_request(@Param("reqId") reqId:string ): Promise<SuccessResponse<IBranchTransfer>> {

        const result = await this.branchTransferService.readSingle({_id: reqId});
        return success("Data fetched successfully", result);
    }

    @Patch("/:reqId/update")
    @Access({ action: "update", resource: "branch-transfer" })
    async update_branch_transfer_request(keyVal:KeyValDto, reqData:UpdateBranchTransferDto): Promise<SuccessResponse<IBranchTransfer>> {

        const result = await this.branchTransferService.update(keyVal, reqData);
        return success("Branch transfer request updated successfully", result);
    }

    @Delete("/:reqId/delete")
    @Access({ action: "delete", resource: "branch-transfer" })
    async delete_branch_transfer_request(keyVal:KeyValDto, reqData:UpdateBranchTransferDto): Promise<SuccessResponse<IBranchTransfer>> {

        const result = await this.branchTransferService.update(keyVal, reqData);
        return success("Branch transfer request deleted successfully", result);
    }
}
