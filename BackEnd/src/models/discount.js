import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const discountSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            min: 0,
            unique: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        count: {
            type: Number,
            required: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },
        maxAmount: {
            type: Number,
        },
        usedBy: [
            {
                userId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Auth', // Thay thế 'Auth' bằng tên mô hình người dùng của bạn nếu khác
                },
                used: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

discountSchema.plugin(mongoosePaginate);
export default mongoose.model("Discount", discountSchema);
