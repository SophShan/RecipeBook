import express from "express";
import { getAllRecipes, createRecipe, deleteRecipe, updateRecipe } from "../controllers/recipe.controller.js";

const router = express.Router();

router.get ("/", getAllRecipes);

router.post ("/", createRecipe);

router.delete ("/:id", deleteRecipe);

router.put ("/:id", updateRecipe);


export default router;