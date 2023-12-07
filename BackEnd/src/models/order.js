import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String },
    userId: {
      type: mongoose.Types.ObjectId,
      require: true
    },
    email: { type: String },
    products: [
      {
        type: Object
      }
    ],
    isPaid: { type: Boolean, default: false },
    total: { type: Number, require: true },
    shipping: { type: String, require: true },
    phone: { type: Number },
    fullName: { type: String },
    payMethod: { type: Number, default: 0 },
    status: { type: Number, default: 1 },
    LydoHoandon: { type: String },
    Motahoandon: { type: String },
    Emaill: { type: String },
    discountCode: { type: String },
    discountAmount: { type: Number, default: 0 },
  }, {
  timestamps: true
}
);
orderSchema.plugin(mongoosePaginate);
export default mongoose.model('Order', orderSchema);
