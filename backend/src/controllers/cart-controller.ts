import { Request, Response } from "express";
import Cart from "../models/cart.model";

export const getCartProduct = async (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    // const { userId } = req.query;
    // const cartProducts = await Cart.find({ user: userId })
    //   .populate("user")
    //   .populate("products.product")
    //   .exec();
    const cartProducts = await Cart.findOne({ user: id }).populate(
      "products.product"
    );
    res.status(200).json({
      message: "success to get cart products",
      cartProducts: cartProducts,
    });
    console.log("Cart product", cartProducts);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "failed to get cart products", error });
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

export const updateCart = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { productId, changedQuantity } = req.body;
  try {
    // 1. find user cart
    const cart = await Cart.findOne({ user: id });
    if (!cart) {
      return res.status(400).json({
        message: "not found user",
      });
    }

    // 2. find product
    const findProduct = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    cart.products[findProduct].quantity = changedQuantity;

    const updatedCart = await cart.save();
    res.status(200).json({
      message: "updated cart",
      updatedCart,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "failed to get carts",
    });
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { productId } = req.body;
  try {
    // 1. find user cart
    const cart = await Cart.findOne({ user: id });
    if (!cart) {
      return res.status(400).json({
        message: "not found user",
      });
    }

    // 2. find product
    const findProduct = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    // console.log("idx", findProduct);

    cart.products.splice(findProduct, 1);

    const updatedCart = await cart.save();
    res.status(200).json({
      message: "delete cart",
      updatedCart,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "failed to delete cart",
    });
  }
};
