import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BranchTransferService } from '../services/branch-transfer.service';
import { CreateBranchTransferDto } from '../dto/create-branch-transfer.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IBranchTransfer } from '../interfaces/branch-transfer.interface';
import { KeyValDto } from '../dto/key-val.dto';
import { UpdateBranchTransferDto } from '../dto/update-branch-transfer.dto';
import { Access } from '@common/decorators';
import { success } from '@common/utils';
import { ISuccessResponse } from '@common/interfaces/payload.interface';

@ApiBearerAuth('access-token')
@Controller('branch-transfer')
export class BranchTransferController {
    constructor(private readonly branchTransferService: BranchTransferService) { }

    @Post("/create")
    @Access({ resource: "branch-transfer", action: "create" })
    async branch_trasfer_request(@Body() reqData: CreateBranchTransferDto): Promise<ISuccessResponse<IBranchTransfer>> {

        const result = await this.branchTransferService.create(reqData);
        return success("Branch transfer requested successfully", result);
    }

    @Get("/read")
    @Access({ resource: "branch-transfer", action: "read" })
    async get_branch_transfer_requests(): Promise<ISuccessResponse<IBranchTransfer[]>> {

        const result = await this.branchTransferService.readAll();
        return success("Data fetched successfully", result);
    }

    @Get("/:reqId/read")
    @Access({ resource: "branch-transfer", action: "read" })
    async get_branch_transfer_request(@Param("reqId") reqId:string ): Promise<ISuccessResponse<IBranchTransfer>> {

        const result = await this.branchTransferService.readSingle({_id: reqId});
        return success("Data fetched successfully", result);
    }

    @Patch("/:reqId/update")
    @Access({ resource: "branch-transfer", action: "update" })
    async update_branch_transfer_request(keyVal:KeyValDto, reqData:UpdateBranchTransferDto): Promise<ISuccessResponse<IBranchTransfer>> {

        const result = await this.branchTransferService.update(keyVal, reqData);
        return success("Branch transfer request updated successfully", result);
    }

    @Delete("/:reqId/delete")
    @Access({ resource: "branch-transfer", action: "delete" })
    async delete_branch_transfer_request(keyVal:KeyValDto, reqData:UpdateBranchTransferDto): Promise<ISuccessResponse<IBranchTransfer>> {

        const result = await this.branchTransferService.update(keyVal, reqData);
        return success("Branch transfer request deleted successfully", result);
    }
}
