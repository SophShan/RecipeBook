import React, { useEffect } from "react";
import { useRecipeStore } from "../store/recipe";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Recipes() {
  const { getRecipes, recipes, deleteRecipe } = useRecipeStore();

  const handleDeleteRecipe = async (id) => {
    const { success, message } = await deleteRecipe(id);
    console.log(success, message);
  };

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  console.log(recipes);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h1 className="mb-10 text-5xl text-center ">Recipes</h1>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="group">
                <img
                  alt={recipe.imageAlt}
                  src={`data:${recipe.imageType};base64,${recipe.image}`}
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover hover:opacity-75 xl:aspect-7/8"
                />
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {recipe.name}
                </p>
                <h3 className="mt-1 text-sm text-gray-700">
                  {recipe.instructions}
                </h3>
                <Link
                  to={`/edit/${recipe._id}`}
                  className="mt-2 text-xl font-medium text-blue-800 float-right"
                >
                  <FaEdit />
                </Link>
                <button
                  onClick={() => handleDeleteRecipe(recipe._id)}
                  className="mt-2 text-xl font-medium text-red-600 float-left hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

//export default Recipes;
