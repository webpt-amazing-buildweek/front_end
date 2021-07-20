// other parts of the code can destructure from this file.

// import and export all action creators
// make sure to comment what each does

import { getRecipe } from "./_shared/middleware/api";


export const getRecipes = getRecipe;
// api call to get a recipe
// args: props
// actions: FETCHING_API_START, FETCHING_API_SUCCESS, FETCHING_API_FAILURE



