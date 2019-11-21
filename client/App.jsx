import React, { Component } from "react";
import extractIngredients from "../apiHelpers/extractIngredients.js";
import Ingredient from "./Components/Ingredient.jsx";
import getIngredientPrice from "../apiHelpers/getIngredientPrice.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      recipe: "",
      recipeTotal: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTotal = this.updateTotal.bind(this);
  }

  handleChange(event) {
    this.setState({ recipe: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    extractIngredients(this.state.recipe).then(data => {
      let formatIngredients = [];
      data.forEach(ingredient => {
        getIngredientPrice(ingredient.original).then(data => {
          formatIngredients.push(data);
          this.setState({ ingredients: this.state.ingredients.concat(data) });
          console.log(
            "checking price",
            Number((data.estimatedCost.value / 100).toFixed(2))
          );
          console.log("check state", this.state.recipeTotal);
          this.setState({
            recipeTotal:
              this.state.recipeTotal +
              Number((data.estimatedCost.value / 100).toFixed(2))
          });
        });
      });
    });
  }

  updateTotal(number) {
    console.log("what price", number);
    console.log("current total", this.state.recipeTotal);
    console.log("new total", Number(number) + Number(this.state.recipeTotal));
    this.setState({ recipeTotal: this.state.recipeTotal + Number(number) });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Recipe Link:
            <input
              type="text"
              value={this.state.recipe}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.ingredients.map(ingredient => {
          return (
            <Ingredient
              updateTotal={this.updateTotal}
              ingredient={ingredient}
            />
          );
        })}
        <div className="ingredient-name">
          Total &nbsp;&nbsp; ${this.state.recipeTotal.toFixed(2)}
        </div>
      </div>
    );
  }
}
