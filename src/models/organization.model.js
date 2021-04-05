import { model, Schema, Types } from "mongoose";

export default model(
    "Organization",
    Schema({
        name: {
            required: true,
            type: String,
        },

        owner: {
            required: true,
            type: Types.ObjectId,
            ref: "User",
        },

        members: [
            {
                type: Types.ObjectId,
                ref: "User",
                default: [],
            },
        ],
    })
);
