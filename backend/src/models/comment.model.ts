import { model, Schema } from "mongoose";

interface IComment {
  _id: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  products: [{ product: Schema.Types.ObjectId; comment: string; rate: number }];
}

const commentSchema = new Schema<IComment>(
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
        comment: {
          type: String,
          required: true,
        },
        rate: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Comment = model<IComment>("Comment", commentSchema);

export default Comment;
