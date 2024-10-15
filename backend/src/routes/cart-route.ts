import { Router } from "express";
import { getCartProduct, createCart } from "../controllers/cart-controller";
import { authentication } from "../middlewares/authentication";

const router = Router();

router.route("/get-cart").get(authentication, getCartProduct);
router.route("/create-cart").post(createCart);

export default router;
