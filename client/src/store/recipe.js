import { create } from "zustand";

// Global vairbale for recipes
export const useRecipeStore = create((set) => ({
  recipes: [],
  setRecipes: (recipes) => set({ recipes }),
  createRecipe: async (newRecipe) => {
    if (!newRecipe.name || !newRecipe.image || !newRecipe.instructions)
      return { success: false, message: "Please fill out all fields" };

    const res = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    });
    if (res.ok) {
      const data = await res.json();
      set((state) => ({ recipes: [...state.recipes, data] }));
      return { success: true, message: "New Recipe Created" };
    } else {
      console.log("Error in res");
      console.log(newRecipe);
    }
    return { success: false, message: "Error in creating new recipe" };
  },
  getRecipes: async () => {
    const res = await fetch("/api/recipes");
    if (res.ok) {
      const data = await res.json();
      set({ recipes: data });
    }
  },
}));
