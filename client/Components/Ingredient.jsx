import React from "react";

export default function Ingredient({ ingredient, checked }) {
  return (
    <div>
      <input
        name="ingredient-check"
        type="checkbox"
        checked={checked}
        // onChange={this.handleInputChange}
      />
      <div className="ingredient-name">
        ${(ingredient.estimatedCost.value / 100).toFixed(2)} &nbsp;&nbsp;
      </div>
      {ingredient.original}
    </div>
  );
}
