import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    displayName: {
        type: mongoose.Schema.Types.String,
        required: false
    },
    password: {
            type: mongoose.Schema.Types.String,
            required: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    }

});

export const User = mongoose.model("User", userSchema);