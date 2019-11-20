import axios from "axios";
import apiKey from "./apikeys.js";
const qs = require("querystring");

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

  return axios
    .post(
      `https://api.spoonacular.com/recipes/parseIngredients?apiKey=${apiKey}`,
      qs.stringify(requestBody),
      config
    )
    .then(({ data }) => {
      return data[0];
    })
    .catch(err => {
      console.log(err);
    });
};

export default getIngredientPrice;
