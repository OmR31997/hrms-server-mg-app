import { Status } from "@module/visa/dto/create-visa.dto";
import { Types } from "mongoose";

export class CreateVisaHistory {

    visa_id: Types.ObjectId;
    old_status: Status;
    new_status: Status;
    changed_by: Types.ObjectId;
}