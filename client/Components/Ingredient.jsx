import React from "react";
import getIngredientPrice from "../../apiHelpers/getIngredientPrice.js";

export default function Ingredient({ ingredient }) {
  let ingredientCost;
  getIngredientPrice(ingredient.original).then(data => (ingredientCost = data));

  return (
    <div>
      ${(ingredient.estimatedCost.value / 100).toFixed(2)} &nbsp;&nbsp;
      <div>{ingredient.original}</div>
    </div>
  );
}
