import axios from "axios";
import apiKey from "./apikeys.js";
import qs = require("querystring");

let getIngredientPrice = ingredient => {
  const requestBody = {
    ingredientList: ingredient,
    servings: 1
  };
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  axios
    .post(
      `https://api.spoonacular.com/recipes/parseIngredients?apiKey=${apiKey}`,
      qs.stringify(requestBody),
      config
    )
    .then(({data}) => {
      console.log('ingredient', data[0].estimatedCost);
    })
    .catch(err => {
      // Do somthing
    });
};

export default getIngredientPrice;
