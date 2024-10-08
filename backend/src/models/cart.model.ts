import { model, Schema } from "mongoose";

interface ICart {
  _id: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  products: [{ product: Schema.Types.ObjectId; quantity: number }];
  totalAmount: Number;
}

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = model<ICart>("Cart", cartSchema);

export default Cart;
