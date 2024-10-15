import { Router } from "express";
import {
  createSaved,
  // deleteSaved,
  getAllSavedProduct,
} from "../controllers/saved-controller";

const router = Router();

router.route("/").get(getAllSavedProduct).post(createSaved);
// router.route("/:id").delete(deleteSaved);

export default router;
