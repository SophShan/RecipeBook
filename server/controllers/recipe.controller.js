import Recipe from "../models/recipes.model.js";
import joi from "joi";
import mongoose from "mongoose";

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find(); // will return all recipes
    res.status(200).send(recipes);
  } catch (error) {
    console.log("Error in fetching all recipes");
    res.status(500).send("Server Error");
  }
};

export const createRecipe = async (req, res) => {
  const recipe = req.body;

  // value parameter will be null and error parameter non-empty if there exists an error returned from validating
  const { error } = validateRecipe(recipe);

  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  const newRecipe = new Recipe(recipe);

  try {
    await newRecipe.save();
    res.status(201).send(newRecipe); // 201 is successful creation
  } catch (error) {
    console.error("Error in Create Recipe: ", error.message);
    res.status(500).send("Server Error"); // 500 is internal server error
  }
};

export const updateRecipe = async (req, res) => {
  const { id } = req.params;

  // Check if the id exists and is a valid mongoDB id
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Invalid Recipe Id");

  const updatedRecipe = req.body;

  // Validate the updated recipe
  const { error } = validateRecipe(updatedRecipe);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    // findByIdAndUpdate causes error if id is not a mongoose object, so type check function above is used
    const recipe = await Recipe.findByIdAndUpdate(id, updatedRecipe, {
      new: true,
    });
    res.status(200).send(recipe);
  } catch (error) {
    console.log("Error in updating recipe");
    res.status(500).send("Server Error");
  }
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  // catch if error occurs
  try {
    const recipe = await Recipe.findByIdAndDelete(id);

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("Invalid Recipe Id");

    res.status(200).send(recipe);
  } catch (error) {
    console.log("Error in deleting a recipe");
    res.status(500).send("Server Error");
  }
};

function validateRecipe(recipe) {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    instructions: joi.string().min(3).required(),
    image: joi.string().min(3).required(),
  });

  return schema.validate(recipe);
}
