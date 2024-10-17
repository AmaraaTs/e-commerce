import { Request, Response } from "express";
import Comment from "../models/comment.model";

export const getComment = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;
  try {
    const productComments = await Comment.find({
      user: userId,
      "products.product": productId,
    })
      .populate("user")
      .populate("products.product");
    res.status(200).json({
      message: "success to get all comments",
      productComments: productComments,
    });
    console.log("product Comments", productComments);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "failed to get all comments", error });
  }
};

export const createComment = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { productId, comment, rate } = req.body;
  try {
    const findCommentUser = await Comment.findOne({ user: id });

    if (!findCommentUser) {
      const saved = await Comment.create({
        user: id,
        products: { product: productId, comment, rate },
      });
      return res.status(200).json({
        message: "created new saved",
        saved,
      });
    }

    const findDuplicated = findCommentUser.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (findDuplicated > -1) {
    } else {
      findCommentUser.products.push({ product: productId, comment, rate });
    }

    const updatedComment = await findCommentUser.save();
    res.status(200).json({
      message: "updated comment",
      updatedComment,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "failed to read comments",
    });
  }
};
