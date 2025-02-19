import express from "express";
import {
  getAllRecipes,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  getSingleRecipe,
} from "../controllers/recipe.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.get("/", getAllRecipes);

router.get("/:id", getSingleRecipe);

router.post("/", upload.single("image"), createRecipe); // upload.single("image") tells multer to look for a single file named image

router.delete("/:id", deleteRecipe);

router.put("/:id", upload.single("image"), updateRecipe);

export default router;
