import { Router } from "express";
import { createComment, getComment } from "../controllers/comment-controller";
import { authentication } from "../middlewares/authentication";

const router = Router();

// router.route("/").post(getAllCategory).post(createCategory);
router.route("/").get(getComment);
router.route("/create-comment").post(authentication, createComment);

export default router;
