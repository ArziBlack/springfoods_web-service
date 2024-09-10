import { Router } from "express";
import { verify } from "../services/verifyService";
import { create_review, get_all_reviews } from "../controllers/review.controller";

const router = Router()

// CREATE A REVIEW
router.route("/add/:id").post(verify, create_review);

// GET ALL REVIEWS
router.route("/").get(verify, get_all_reviews);

// UPDATE A REVIEW

// DELETE A REVIEW

export default router;