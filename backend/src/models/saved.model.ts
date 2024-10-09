import { model, Schema } from "mongoose";

interface ISaved {
  _id: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  products: [{ product: Schema.Types.ObjectId }];
}

const savedSchema = new Schema<ISaved>(
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Saved = model<ISaved>("Saved", savedSchema);

export default Saved;
