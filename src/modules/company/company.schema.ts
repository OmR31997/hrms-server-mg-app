import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CompanyDocument = Company & Document;

@Schema({timestamps: true})
export class Company {

    @Prop({ required:[ true, `'legal_name' field must be required`] })
    legal_name: string;

    @Prop({ required: [ true, `'trn' field must be required`] })
    trn: string;

    @Prop({ required: [ true, `'registration_no' field must be required`] })
    registration_no: string;

    @Prop({ required: [ true, `'license_expiry' field must be required`] })
    license_expiry: Date;

    @Prop({ required: [ true, `'country' field must be required`] })
    country: string;

    @Prop({ required: [ true, `'currency' field must be required`], enum:["INR", "AED", "USD"] })
    currency: string;

    @Prop({ required: [ true, `'visa_quota_total' field must be required`] })
    visa_quota_total: number;

    @Prop({ default: "approved", enum:["approved", "rejected"] })
    status: string;

}

export const CompanySchema = SchemaFactory.createForClass(Company);