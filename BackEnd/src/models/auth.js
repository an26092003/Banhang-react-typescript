import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const authSchame = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },

  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
  favourite: [{ type: mongoose.Types.ObjectId, ref: "Favourite" }],

  role: {
    type: String,
    default: "member",
  },
});
authSchame.plugin(mongoosePaginate);
export default mongoose.model("Auth", authSchame);
