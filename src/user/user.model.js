import { Schema, model } from "mongoose"

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            maxLegnth: [15, "Can't be more than 15 characters"],
            minLegnth: [2, "Can't be less than 2 characters"],
        },
        lastname: {
            type: String,
            required: [true, "Lastname is required"],
            trim: true,
            maxLegnth: [15, "Can't be more than 15 characters"],
            minLegnth: [2, "Can't be less than 2 characters"],
        },
        username:{
            type: String,
            required: true,
            unique: true,
            maxLegnth: [15, "Can't be more than 15 characters"],
            minLegnth: [6, "Can't be less than 6 characters"],
        },
        email:{
            type: String,
            isMail: true,
            unique: true,
            required: [true, "Email is required"],
            match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        },
        password:{
            type: String,
            required: [true, "Password is required"],
            minLegnth: [8, "Can't be less than 8 characters"],
        },
        role:{
            type: String,
            default: "ADMIN",
        },
    }
)

export default model("User", userSchema);
