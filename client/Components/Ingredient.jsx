import React from "react";
import getIngredientPrice from '../../apiHelpers/getIngredientPrice.js'

export default function Ingredient({ ingredient }) {
  return <div>
      <span>
    {getIngredientPrice(ingredient)}
      </span>
      {ingredient.original}
      </div>;
}
