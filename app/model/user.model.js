import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            maxlength: 30,
            minlength: 4
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            maxlength: 20,
            minlength: 6
        }
    }, { timestamps: true }
)

const UserModel = mongoose.model("UserModel", userSchema);
export default UserModel;