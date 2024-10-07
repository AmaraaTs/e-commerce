import { Router } from "express";
import { getAllCartProduct } from "../controllers/cart-controller";

const router = Router();

router.route("/").get(getAllCartProduct);

export default router;
