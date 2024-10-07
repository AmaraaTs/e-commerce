import { Request, Response } from "express";
import Cart from "../models/cart.model";

export const getAllCartProduct = async (req: Request, res: Response) => {
  try {
    const cartProducts = await Cart.find({}).populate(["product", "user"]);
    res.status(200).json({
      message: "success to get all cart products",
      cartProducts: cartProducts,
    });
    console.log("Cart product", cartProducts);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "failed to get all cart products", error });
  }
};
