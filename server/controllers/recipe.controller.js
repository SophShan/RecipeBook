import Recipe from "../models/recipes.model.js";
//import joi, { binary } from "joi";
import mongoose from "mongoose";

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find(); // will return all recipes

    const recipesWithImageAsBase64 = recipes.map((recipe) => {
      return {
        ...recipe.toObject(), // Convert Mongoose document to plain JS object
        image: recipe.image
          ? recipe.image.toString("base64")
          : console.log(`recipe.image is ${recipe.image}`),
      };
    });

    res.status(200).send(recipesWithImageAsBase64);
  } catch (error) {
    console.log("Error in fetching all recipes");
    res.status(500).send("Server Error");
  }
};

export const getSingleRecipe = async (req, res) => {
  const { id } = req.params;

  // Check if the id exists and is a valid mongoDB id
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Invalid Recipe Id");

  try {
    const recipe = await Recipe.findById(id); // will return all recipes

    /*
    recipeBase64 = {
      ...recipe.toObject(), // Convert Mongoose document to plain JS object
      image: recipe.image
        ? recipe.image.toString("base64")
        : console.log(`recipe.image is ${recipe.image}`),
    }; */

    res.status(200).send(recipe);
  } catch (error) {
    console.log("Error in fetching single recipe");
    res.status(500).send("Server Error");
  }
};

export const createRecipe = async (req, res) => {
  // Make sure req.file exists before trying to access it
  if (!req.file) {
    return res.status(400).send("Image file is required.");
  }

  const recipe = new Recipe({
    name: req.body.name,
    instructions: req.body.instructions,
    image: req.file.buffer,
    imageType: req.file.mimetype, // in joi, null is considered a valid input, will still validate it on .required if set to null
  });

  /* Joi does not work with mongoose binary
  const recipeObject = recipe.toObject();

    value parameter will be null and error parameter non-empty if there exists an error returned from validating
  const { error } = validateRecipe(recipeObject);

  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  } */

  try {
    await recipe.validate();
    await recipe.save();
    res.status(201).send(recipe); // 201 is successful creation
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

  if (req.file) {
    console.log(req.file.image);
    console.log(req.file.imageType);
    console.log(typeof req.file);
    console.log(typeof req.file.buffer);
    console.log(req.file.buffer);

    const updatedRecipe = new Recipe({
      name: req.body.name,
      instructions: req.body.instructions,
      image: req.file.buffer,
      imageType: req.file.mimetype,
    });

    console.log("not a buffer");
  } else {
    console.log(req.body);
    console.log(typeof req.body.image);
    console.log(Buffer.isBuffer(req.body.image));
    console.log("Raw Image Data:", req.body.image);
    const base64Data = req.body.image.replace(
      /^data:image\/[a-z]+;base64,/,
      ""
    );
    console.log("Raw Image Data:", req.body.image);
    console.log("Type of req.body.image:", typeof req.body.image);

    const imageString = JSON.stringify(req.body.image);
    console.log("Image as String:", imageString);

    console.log("Clean Base64 Data:", base64Data);
    const updatedRecipe = new Recipe({
      name: req.body.name,
      instructions: req.body.instructions,
      image: Buffer.from(base64Data, "base64"),
      imageType: req.body.imageType,
    });
    console.log(updatedRecipe.image);
    console.log(updatedRecipe.image instanceof String);
    console.log(updatedRecipe.image instanceof Buffer);
    console.log(updatedRecipe.image.image);
    console.log("is a buffer");
  }

  /* Joi does not work with mongoose binary
  const recipeObject = recipe.toObject();

  // Validate the updated recipe
  const { error } = validateRecipe(recipeObject);

  if (error) return res.status(400).send(error.details[0].message);
  */

  try {
    console.log("validating");
    await updatedRecipe.validate((err) => {
      for (let key in err.errors) {
        console.log(`Error in ${key}: ${err.errors[key].message}`);
      }
    });
    console.log("validated");
    // findByIdAndUpdate causes error if id is not a mongoose object, so type check function above is used
    const recipe = await Recipe.findByIdAndUpdate(id, updatedRecipe, {
      new: true,
    });
    console.log("updated");
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
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("Invalid Recipe Id");

    const recipe = await Recipe.findByIdAndDelete(id);

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
    imageType: joi
      .string()
      .valid("image/jpeg", "image/png", "image/gif", "image/jpg")
      .required(),
    image: joi.binary().required(),
  });

  return schema.validate(recipe);
}
