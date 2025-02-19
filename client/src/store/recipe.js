import { create } from "zustand";

// Global vairbale for recipes
export const useRecipeStore = create((set) => ({
  recipes: [],
  recipe: {},
  setRecipes: (recipes) => set({ recipes }),
  createRecipe: async (newRecipe) => {
    if (
      !newRecipe.name ||
      !newRecipe.image ||
      !newRecipe.instructions ||
      !newRecipe.imageType
    ) {
      console.log(
        newRecipe.name,
        newRecipe.image,
        newRecipe.instructions,
        newRecipe.imageType
      );
      return { success: false, message: "Please fill out all fields" };
    }

    const formData = new FormData();
    formData.append("name", newRecipe.name);
    formData.append("instructions", newRecipe.instructions);
    formData.append("image", newRecipe.image);
    formData.append("imageType", newRecipe.imageType);

    const res = await fetch("/api/recipes", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      set((state) => ({ ...state, recipes: [...state.recipes, data] })); // keep all previous recipes and add new one
      return { success: true, message: "New Recipe Created" };
    } else {
      console.log(newRecipe);
      return { success: false, message: "Error in creating new recipe" };
    }
  },
  getRecipes: async () => {
    const res = await fetch("/api/recipes");
    if (res.ok) {
      const data = await res.json();
      set({ recipes: data });
    }
  },
  editRecipe: async (id, updatedRecipe) => {
    if (
      !updatedRecipe.name ||
      !updatedRecipe.image ||
      !updatedRecipe.instructions ||
      !updatedRecipe.imageType
    ) {
      console.log(
        updatedRecipe.name,
        updatedRecipe.image,
        updatedRecipe.instructions,
        updatedRecipe.imageType
      );
      return { success: false, message: "Please fill out all fields" };
    }

    const formData = new FormData();
    formData.append("name", updatedRecipe.name);
    formData.append("instructions", updatedRecipe.instructions);
    formData.append("image", updatedRecipe.image);
    formData.append("imageType", updatedRecipe.imageType);

    const res = await fetch(`/api/recipes/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      set((state) => ({
        // map through the recipes, if it is not the one we are looking for, don't change it, otherwise set it to our updated version
        // to update the ui immediately (trigger a re-render)
        recipes: state.recipes.map((recipe) => {
          recipe._id === id ? data : recipe;
        }),
      }));
      return { success: true, message: "Recipe Updated" };
    } else {
      console.log(updatedRecipe);
      return { success: false, message: "Error in creating updating recipe" };
    }
  },
  deleteRecipe: async (id) => {
    const res = await fetch(`/api/recipes/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const data = await res.json();
      set((state) => ({
        // update the ui immediately (trigger a re-render)
        recipes: state.recipes.filter((recipe) => recipe._id !== id),
      }));
      return { success: true, message: "Recipe Deleted" };
    } else {
      console.log("Error in deleting recipe");
      return { success: false, message: "Error in deleting recipe" };
    }
  },
  getSingleRecipe: async (id) => {
    const res = await fetch(`/api/recipes/${id}`, {
      method: "GET",
    });
    if (res.ok) {
      const data = await res.json();
      set({ recipe: data });
    } else {
      console.log("Error in getting single recipe");
    }
  },
}));
