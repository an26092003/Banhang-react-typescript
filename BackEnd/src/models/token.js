import mongoose from "mongoose";
const tokenSchema = new mongoose.Schema(
    {
        userId: {
            required:true,
            type: String
        },
        token: {
            required:true,
            type: String,
        },
        expireAt: {
            type: Date,
            default: new Date(new Date().getTime() + 5 /* expires after 3 minutes */ * 60000)
        }
    },
);

export default mongoose.model("Token", tokenSchema);
