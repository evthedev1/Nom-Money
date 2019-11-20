import React from "react";
import getIngredientPrice from "../../apiHelpers/getIngredientPrice.js";

export default function Ingredient({ ingredient }) {
  let ingredientCost;
  getIngredientPrice(ingredient.original).then(data => (ingredientCost = data));

  return (
    <div>
      {ingredientCost}
      {ingredient.original}
    </div>
  );
}
