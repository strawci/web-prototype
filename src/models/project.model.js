import { model, Schema, Types } from "mongoose";

export default model(
    "Project",
    Schema({
        name: {
            required: true,
            type: String,
        },

        description: {
            required: true,
            type: String,
        },

        organization: {
            required: true,
            type: Types.ObjectId,
            ref: "Organization",
        },

        active: {
            type: Boolean,
            default: true,
        },

        sourcekey: {
            required: true,
            type: String,
        },

        deploykey: {
            required: true,
            type: String,
        },
    })
);
