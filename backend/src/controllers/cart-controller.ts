import { Request, Response } from "express";
import Cart from "../models/cart.model";

export const getAllCartProduct = async (req: Request, res: Response) => {
  try {
    const cartProducts = await Cart.find({})
      .populate("products.product")
      .exec();
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

export const createCart = async (req: Request, res: Response) => {
  const { userId, productId, totalAmount, quantity } = req.body;
  try {
    const findUserCart = await Cart.findOne({ user: userId });

    if (!findUserCart) {
      const cart = await Cart.create({
        user: userId,
        products: { product: productId, quantity },
        totalAmount,
      });
      return res.status(200).json({
        message: "created new cart",
        cart,
      });
    }

    const findDuplicated = findUserCart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (findDuplicated > -1) {
      findUserCart.products[findDuplicated].quantity += quantity;
    } else {
      findUserCart.products.push({ product: productId, quantity });
    }

    const updatedCart = await findUserCart.save();
    res.status(200).json({
      message: "updated cart",
      updatedCart,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "failed to read carts",
    });
  }
};
