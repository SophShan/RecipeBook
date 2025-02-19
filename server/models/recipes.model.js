import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  //ingredients: {
  //    type: String,
  //    required: true
  //},
  instructions: {
    type: String,
    required: true,
  },
  imageType: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
});

// mongoose automatically converts Recipe name to recipes
const Recipe = mongoose.model("Recipe", recipeSchema); // tells mongoose to create a collection/model called Recipe with the specified schema

export default Recipe;
