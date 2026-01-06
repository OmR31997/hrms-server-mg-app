import { Types, Schema } from "mongoose";

const objectIdFields = ["employee_id", "company_id", "role_id"];

function objectIdPlugin(schema: Schema) {

    // save()
    schema.pre("save", async function () {
        objectIdFields.forEach((field) => {
            if ((this as any)[field]) {
                (this as any)[field] = new Types.ObjectId((this as any)[field]);
            }
        });
    });

    // update middleware (shared)
    const updateMiddleware = async function () {
        const update = this.getUpdate();
        if (!update) return;

        objectIdFields.forEach((field) => {
            if (update[field]) {
                update[field] = new Types.ObjectId(update[field]);
            }

            if (update.$set?.[field]) {
                update.$set[field] = new Types.ObjectId(update.$set[field]);
            }
        });
    };

    schema.pre("findOneAndUpdate", updateMiddleware);
    schema.pre("updateOne", updateMiddleware);
    schema.pre("updateMany", updateMiddleware);
}

export default objectIdPlugin;
