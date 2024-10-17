import { Request, Response } from "express";
import Comment from "../models/comment.model";

export const getComment = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const productComments = await Comment.find({
      // "products.product": productId, // Correct query for nested product inside the array
    }).populate("user");
    // .populate("products.product");

    const isCommentHave = productComments.map((comment) => {
      return comment.products.filter(
        (product) => String(product.product) === String(productId)
      );
    });

    console.log("iscommenthave", isCommentHave);

    if (!isCommentHave) {
      return res.status(401).json({
        message: "not found comment",
      });
    }

    const filteredComments = productComments.map((comment) => {
      return {
        ...comment.toObject(), // Use toObject to avoid issues with Mongoose documents
        products: comment.products.filter(
          (product) => String(product.product) === String(productId)
        ),
      };
    });

    res.status(200).json({
      message: "success to get all comments",
      filteredComments: filteredComments,
    });
    console.log("product Comments", filteredComments);
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
