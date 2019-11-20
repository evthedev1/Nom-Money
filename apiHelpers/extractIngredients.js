import axios from "axios";
import apiKey from "./apikeys.js";

let extractIngredients = recipeLink =>
  axios
    .get(
      `https://api.spoonacular.com/recipes/extract?url=${recipeLink}&apiKey=${apiKey}`
    )
    .then(({ data }) => {
      let ingredientList = data.extendedIngredients;
      let ingredientStrings = ingredientList.map(ingredient => {
        return ingredient.original;
      });
      return ingredientStrings;
    });

export default extractIngredients;
