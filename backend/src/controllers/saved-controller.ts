import { Request, Response } from "express";
import Saved from "../models/saved.model";

export const getAllSavedProduct = async (req: Request, res: Response) => {
  try {
    const savedProducts = await Saved.find({})
      .populate("user")
      .populate("products.product")
      .exec();
    res.status(200).json({
      message: "success to get all saved products",
      savedProducts: savedProducts,
    });
    console.log("Saved product", savedProducts);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "failed to get all saved products", error });
  }
};

export const createSaved = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;
  try {
    const findUserSaved = await Saved.findOne({ user: userId });

    if (!findUserSaved) {
      const saved = await Saved.create({
        user: userId,
        products: { product: productId },
      });
      return res.status(200).json({
        message: "created new saved",
        saved,
      });
    }

    const findDuplicated = findUserSaved.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (findDuplicated > -1) {
    } else {
      findUserSaved.products.push({ product: productId });
    }

    const updatedCart = await findUserSaved.save();
    res.status(200).json({
      message: "updated saved",
      updatedCart,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "failed to read carts",
    });
  }
};

export const deleteSaved = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const { productId } = req.params;
  try {
    const findUserSaved = await Saved.findOne({ user: userId });

    if (!findUserSaved) {
      return res.status(400).json({
        message: "Хэрэглэгч олдсонгүй",
      });
    }

    const findSavedIndex = findUserSaved.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (!findSavedIndex) {
      return res.status(400).json({
        message: "Хадгалсан бараа олдсонгүй",
      });
    }

    console.log(findSavedIndex);

    if (findSavedIndex > -1) {
      findUserSaved.products.splice(findSavedIndex, 1);
    } else {
      return res.status(400).json({
        message: "Хадгалсан бараа устгасангүй",
      });
    }

    const updatedCart = await findUserSaved.save();
    res.status(200).json({
      message: "deleted saved",
      updatedCart,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "failed to delete carts",
    });
  }
};
