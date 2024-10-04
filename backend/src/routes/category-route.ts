import { Router } from "express";
import {
  getAllCategory,
  createCategory,
} from "../controllers/category-controller";

const router = Router();

// router.route("/").post(getAllCategory).post(createCategory);
router.route("/").post(createCategory).get(getAllCategory);

export default router;
