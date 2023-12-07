import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const favouriteSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Auth'
    },
    wishlist_items: [{
        product_id: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
    }]

},
    {
        timestamps: true,
        versionKey: false,
    });
favouriteSchema.plugin(mongoosePaginate);

export default mongoose.model('Favourite', favouriteSchema);
