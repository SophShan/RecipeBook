 import mongoose from "mongoose";

 const recipeSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    //ingredients: {
    //    type: String,
    //    required: true
    //},
    instructions: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
    // timestamps: true // for createdAt, updatedAt
 });

 // mongoose automatically converts Recipe name to recipes 
 const Recipe = mongoose.model ('Recipe', recipeSchema); // tells mongoose to create a collection/model called Recipe with the specified schema

 export default Recipe;