import React, { useEffect } from "react";
import Recipe from "../components/Recipes/Recipe/Recipe";
import { useRecipeStore } from "../store/recipe";

export default function Recipes() {
  const { getRecipes, recipes } = useRecipeStore();

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  console.log(recipes);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {recipes.map((recipe) => (
            <a key={recipe.id} href={recipe.href} className="group">
              <img
                alt={recipe.imageAlt}
                src={recipe.imageSrc}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
              />
              <p className="mt-1 text-lg font-medium text-gray-900">
                {recipe.name}
              </p>
              <h3 className="mt-1 text-sm text-gray-700">
                {recipe.instructions}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const Recipes2 = () => {
  return (
    <>
      <h1>Recipes</h1>
      <Recipe />
      <Recipe />
    </>
  );
};

//export default Recipes;
