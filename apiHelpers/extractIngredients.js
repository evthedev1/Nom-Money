import axios from Axios
import {apiHost, apiKey} from './apikeys.js'

let headers: {
    "x-rapidapi-host": apiHost,
    "x-rapidapi-key": apiKey
}

let extractIngredients = (recipeLink) => axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract?url=${recipeLink}`)
