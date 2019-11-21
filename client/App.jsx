import React, { Component } from "react";
import extractIngredients from "../apiHelpers/extractIngredients.js";
import Ingredient from "./Components/Ingredient.jsx";
import getIngredientPrice from "../apiHelpers/getIngredientPrice.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ItemToBuy from "./Components/ItemToBuy.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      recipe: "",
      recipeTotal: 0,
      itemsToBuy: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTotal = this.updateTotal.bind(this);
    this.addToShoppingList = this.addToShoppingList.bind(this);
  }

  handleChange(event) {
    this.setState({ recipe: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ ingredients: [], recipeTotal: 0 });
    extractIngredients(this.state.recipe).then(data => {
      let formatIngredients = [];
      data.forEach(ingredient => {
        getIngredientPrice(ingredient.original).then(data => {
          formatIngredients.push(data);
          this.setState({ ingredients: this.state.ingredients.concat(data) });
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
    this.setState({ recipeTotal: this.state.recipeTotal + Number(number) });
  }
  addToShoppingList() {
    let toBuy = this.state.ingredients.map(ingredient => {
      return ingredient.name;
    });
    this.setState({ itemsToBuy: this.state.itemsToBuy.concat(toBuy) });
  }
  render() {
    return (
      <div>
        <div className="logo">NOM-MONEY</div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <div className="link-submit">
              <TextField
                id="recipe-link"
                label="Recipe Link Here"
                margin="normal"
                type="text"
                value={this.state.recipe}
                onChange={this.handleChange}
              />
              <Button
                className="button-submit"
                onClick={this.handleSubmit}
                variant="outlined"
              >
                Submit
              </Button>
              <Button
                className="button-add-shopping"
                onClick={this.addToShoppingList}
                variant="outlined"
              >
                Add to Shopping List
              </Button>
            </div>
          </label>
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
          Total &nbsp;&nbsp; ${this.state.recipeTotal.toFixed(2)} per serving
        </div>
        <br></br>
        <h3>MY SHOPPING LIST</h3>
        {this.state.itemsToBuy.map(item => {
          return <ItemToBuy item={item} />;
        })}
        <br></br>
        <br></br>
        <a href="www.google.com">too broke? check out NOM-PANTRY</a>
        <br></br>
        <a href="www.google.com">want to get fit? check out NOM-FIT</a>
      </div>
    );
  }
}
