import { Router } from "express";
import {
  createSaved,
  deleteSaved,
  getAllSavedProduct,
} from "../controllers/saved-controller";
import { authentication } from "../middlewares/authentication";

const router = Router();

router.route("/").get(authentication, getAllSavedProduct).post(createSaved);
router.route("/delete-saved").delete(authentication, deleteSaved);

export default router;
