import { Router } from "express";
import {
  createSaved,
  getAllSavedProduct,
} from "../controllers/saved-controller";

const router = Router();

router.route("/").get(getAllSavedProduct).post(createSaved);

export default router;
