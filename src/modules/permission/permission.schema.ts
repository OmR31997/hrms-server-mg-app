import { Prop } from "@nestjs/mongoose";

export class Permission {
    
    @Prop({ required: true })
    resource: string;

    @Prop({ unique: true, required: true })
    action: string;

    @Prop({ unique: true, required: true })
    scope: string;
}