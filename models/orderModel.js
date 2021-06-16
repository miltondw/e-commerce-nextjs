import { model, Schema, models, Types } from "mongoose";
const orderSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "user",
    },
    address: String,
    mobile: String,
    cart: Array,
    total: Number,
    delivered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
let Dataset = models.order || model("order", orderSchema);

export default Dataset;
