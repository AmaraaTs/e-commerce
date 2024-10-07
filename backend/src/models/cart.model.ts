import { model, Schema } from "mongoose";

interface ICart {
  _id: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  quantity: number;
  user: Schema.Types.ObjectId;
}

const cartSchema = new Schema<ICart>(
  {
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    quantity: { type: Number, required: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Cart = model<ICart>("Cart", cartSchema);

export default Cart;
