import { Router } from "express";
import { getAllCartProduct, createCart } from "../controllers/cart-controller";

const router = Router();

router.route("/").get(getAllCartProduct);
router.route("/create-cart").post(createCart);

export default router;
