import { Router } from "express";
import {
  getCartProduct,
  createCart,
  updateCart,
  deleteCart,
} from "../controllers/cart-controller";
import { authentication } from "../middlewares/authentication";

const router = Router();

router.route("/get-cart").get(authentication, getCartProduct);
router.route("/create-cart").post(createCart);
router.route("/update-cart").put(authentication, updateCart);
router.route("/delete-cart").delete(authentication, deleteCart);

export default router;
