import { model, Schema } from "mongoose";

export default model(
    "User",
    Schema({
        username: {
            unique: true,
            required: true,
            type: String,
        },

        firstname: {
            required: true,
            type: String,
        },

        lastname: {
            required: true,
            type: String,
        },

        email: {
            unique: true,
            required: true,
            type: String,
        },

        password: {
            required: true,
            type: String,
        },

        premium: {
            type: Boolean,
            default: false,
        },
    })
);
